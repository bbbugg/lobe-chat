import { AgentRuntimeErrorType, StandardErrorType } from '@lobechat/model-runtime';
import archiver from 'archiver';
import { NextRequest, NextResponse } from 'next/server';

import { BRANDING_NAME } from '@/const/branding';
import { serverDB } from '@/database/core/db-adaptor';
import { FileService } from '@/server/services/file';
import { createErrorResponse } from '@/utils/errorResponse';
import { getUserAuth } from '@/utils/server';
import { getYYYYmmddHHMMss } from '@/utils/time';

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

    const fileName = `${BRANDING_NAME}_batch_download_${getYYYYmmddHHMMss(new Date())}.zip`;
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
      for (const file of files) {
        try {
          let fileContent: Uint8Array | undefined;

          try {
            fileContent = await fileService.getFileByteArray(file.url);
          } catch (error: any) {
            if (error.Code === 'NoSuchKey' || error.message?.includes('File not found')) {
              // 对于 S3 中未找到的文件，记录警告并跳过，但不中断整个流程
              headers.set('X-Lobe-Error', encodeURIComponent('部分文件未找到')); // 设置自定义错误头
              continue;
            } else {
              throw error;
            }
          }

          if (fileContent && fileContent.length > 0) {
            const buffer = Buffer.from(fileContent);
            archive.append(buffer, { name: file.name });
            downloadedFileCount++; // 成功下载文件，增加计数
          } else {
            headers.set('X-Lobe-Error', encodeURIComponent('部分文件未找到')); // 设置自定义错误头
          }
        } catch (error) {
          console.error(`下载文件失败: ${file.url}`, error);
        }
      }

      archive.finalize();
    })();

    archive.on('end', () => {
      writer.close();
    });

    // 在此处处理 archive 的错误事件，确保错误被捕获并关闭 writer
    archive.on('error', (err: archiver.ArchiverError) => {
      writer.abort(err);
    });

    // 捕获 writer.abort 引起的错误
    writer.closed.catch((err) => {
      console.error('Writable stream error:', err);
    });

    if (downloadedFileCount === 0 && files.length > 0) {
      return createErrorResponse(StandardErrorType.InternalServerError, '所有文件下载失败');
    }

    return new NextResponse(responseStream.readable, { headers });
  } catch (error: any) {
    if (error.message === '所有文件下载失败') {
      return createErrorResponse(StandardErrorType.InternalServerError, error.message);
    }
    console.error('Batch download error:', error);
    return createErrorResponse(
      StandardErrorType.InternalServerError,
      `批量下载失败: ${error instanceof Error ? error.message : '未知错误'}`,
    );
  }
};
