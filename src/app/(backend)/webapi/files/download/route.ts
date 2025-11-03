import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { AgentRuntimeErrorType, StandardErrorType } from '@lobechat/model-runtime';
import { ChatErrorType } from '@lobechat/types';
import archiver from 'archiver';
import { NextRequest, NextResponse } from 'next/server';

import { serverDB } from '@/database/core/db-adaptor';
import { fileEnv } from '@/envs/file';
import { FileService } from '@/server/services/file';
import { createErrorResponse } from '@/utils/errorResponse';
import { getUserAuth } from '@/utils/server';
import { getYYYYmmddHHMMss } from '@/utils/time';

const DEFAULT_S3_REGION = 'us-east-1';

// 创建S3客户端，参考src/server/modules/S3/index.ts中的实现
const s3Client = new S3Client({
    region: fileEnv.S3_REGION || DEFAULT_S3_REGION,
    credentials: {
        accessKeyId: fileEnv.S3_ACCESS_KEY_ID as string,
        secretAccessKey: fileEnv.S3_SECRET_ACCESS_KEY as string,
    },
    endpoint: fileEnv.S3_ENDPOINT,
    forcePathStyle: fileEnv.S3_ENABLE_PATH_STYLE,
    // 参考其他S3实现，添加校验配置
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
});

export const POST = async (req: NextRequest) => {
    const { fileIds }: { fileIds: string[] } = await req.json();

    const { userId } = await getUserAuth();

    if (!userId) {
        return createErrorResponse(AgentRuntimeErrorType.PermissionDenied, 'User not authorized');
    }

    if (!fileIds || fileIds.length === 0) {
        return createErrorResponse(StandardErrorType.BadRequest, 'No file IDs provided');
    }

    try {
        const fileService = new FileService(serverDB, userId);
        const files = await fileService.findFilesByIds(fileIds);

        let downloadedFileCount = 0; // 成功下载的文件数量

        if (files.length === 0) {
            return createErrorResponse(
                StandardErrorType.InternalServerError,
                'No files found for the given IDs',
            );
        }



        const archive = archiver('zip', {
            zlib: { level: 9 }, // 设置压缩级别
        });

        // 设置响应头，告诉浏览器这是一个ZIP文件，并建议文件名
        const fileName = `批量下载_${getYYYYmmddHHMMss(new Date())}.zip`;
        const headers = new Headers({
            'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
            'Content-Type': 'application/zip', // 确保文件名正确编码
        });

        const responseStream = new TransformStream();
        const writableStream = responseStream.writable;
        const writer = writableStream.getWriter();

        archive.on('data', (chunk: Buffer) => {
            writer.write(chunk);
        });

        // 异步等待所有文件添加到归档
        await (async () => {
            const totalFilesCount = files.length;

            for (const file of files) {
                try {
                    const command = new GetObjectCommand({
                        Bucket: fileEnv.S3_BUCKET,
                        Key: file.url,
                    });

                    let Body;
                    try {
                        const result = await s3Client.send(command);
                        Body = result.Body;
                    } catch (error: any) {
                        if (error.Code === 'NoSuchKey') {
                            // 对于 S3 中未找到的文件，记录警告并跳过，但不中断整个流程
                            console.warn(`文件在S3中未找到: ${file.url}`);
                            headers.set('X-Lobe-Error', encodeURIComponent('部分文件未找到')); // 设置自定义错误头
                            continue; // 跳过此文件，继续处理下一个
                        } else {
                            console.error(`下载文件失败: ${file.url} ${error.message}`);
                            throw error; // 重新抛出其他类型的错误
                        }
                    }

                    if (Body) {
                        // 将 ReadableStream 或 Blob 转换为 Buffer
                        const arrayBuffer = await new Response(Body as Blob).arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        archive.append(buffer, { name: file.name });
                        downloadedFileCount++; // 成功下载文件，增加计数
                    } else {
                        // 如果 Body 为空，也按文件未找到处理
                        console.warn(`文件在S3中未找到（Body为空）: ${file.url}`);
                        headers.set('X-Lobe-Error', encodeURIComponent('部分文件未找到')); // 设置自定义错误头
                    }
                } catch (error) {
                    console.error(`下载文件失败: ${file.url}`, error);
                }
            }

            // 在所有文件都被添加到存档后，才调用 finalize
            if (downloadedFileCount === 0 && totalFilesCount > 0) {
                // 如果所有文件都下载失败，则不生成 ZIP 包，直接返回错误
                throw new Error('所有文件下载失败');
            }
            archive.finalize();
        })();

        archive.on('end', () => {
            writer.close();
        });

        // 在此处处理 archive 的错误事件，确保错误被捕获并关闭 writer
        archive.on('error', (err: archiver.ArchiverError) => {
            console.error('Archiver stream error:', err);
            writer.abort(err);
        });

        // 捕获 writer.abort 引起的错误
        writer.closed.catch((err) => {
            console.error('Writable stream error:', err);
        });

        return new NextResponse(responseStream.readable, { headers });
    } catch (error: any) {
        if (error.message === '所有文件下载失败') {
            return createErrorResponse(ChatErrorType.ContentNotFound, error.message);
        }
        console.error('Batch download error:', error);
        return createErrorResponse(
            StandardErrorType.InternalServerError,
            `批量下载失败: ${error instanceof Error ? error.message : '未知错误'}`,
        );
    }
};
