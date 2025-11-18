import { StandardErrorType } from '@lobechat/model-runtime';
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
    return createErrorResponse(StandardErrorType.Unauthorized, 'User not authorized');
  }

  if (!fileIds || fileIds.length === 0) {
    return createErrorResponse(StandardErrorType.BadRequest, 'No file IDs provided');
  }

  try {
    const fileService = new FileService(serverDB, userId);
    const files = await fileService.findFilesByIds(fileIds);

    let downloadedFileCount = 0;
    const failedFiles: string[] = [];

    if (files.length === 0) {
      return createErrorResponse(
        StandardErrorType.ContentNotFound,
        'No files found for the given IDs',
      );
    }

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    const fileName = `${BRANDING_NAME}_batch_download_${getYYYYmmddHHMMss(new Date())}.zip`;
    const headers = new Headers({
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      'Content-Type': 'application/zip',
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
          fileContent = await fileService.getFileByteArray(file.url);

          if (fileContent && fileContent.length > 0) {
            const buffer = Buffer.from(fileContent);
            archive.append(buffer, { name: file.name });
            downloadedFileCount++;
          } else {
            failedFiles.push(file.name);
          }
        } catch (error: any) {
          if (error.Code === 'NoSuchKey' || error.message?.includes('File not found')) {
            failedFiles.push(file.name);
          } else {
            throw error;
          }
        }
      }
      if (failedFiles.length > 0) {
        const errorMessage = `${failedFiles.join(', ')}`;
        headers.set('X-Lobe-Error', encodeURIComponent(errorMessage));
      }
      archive.finalize();
    })();

    archive.on('end', () => {
      writer.close();
    });

    archive.on('error', (err: archiver.ArchiverError) => {
      writer.abort(err);
    });
    writer.closed.catch((err) => {
      return createErrorResponse(
        StandardErrorType.InternalServerError,
        `Writable stream error: ${err}`,
      );
    });

    // 所有文件都下载失败，返回错误信息
    if (downloadedFileCount === 0 && files.length > 0) {
      return createErrorResponse(
        StandardErrorType.InternalServerError,
        'All files failed to download.',
      );
    }

    return new NextResponse(responseStream.readable, { headers });
  } catch (error: any) {
    return createErrorResponse(
      StandardErrorType.InternalServerError,
      `${error instanceof Error ? error.message : 'Unknown error.'}`,
    );
  }
};
