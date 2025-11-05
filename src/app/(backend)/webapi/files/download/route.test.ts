// @vitest-environment node
import { NextRequest, NextResponse } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { serverDB } from '@/database/core/db-adaptor';
import { FileService } from '@/server/services/file';
import { getUserAuth } from '@/utils/server';

import { POST } from './route';

vi.mock('@/database/core/db-adaptor', () => ({
  serverDB: vi.fn(),
}));

vi.mock('@/server/services/file', () => ({
  FileService: vi.fn(() => ({
    findFilesByIds: vi.fn(),
    getFileByteArray: vi.fn(),
  })),
}));

vi.mock('@/utils/server', () => ({
  getUserAuth: vi.fn(),
}));

let request: NextRequest;

beforeEach(() => {
  request = new NextRequest('https://test.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileIds: ['file1', 'file2'] }),
  });

  vi.mocked(getUserAuth).mockResolvedValue({ userId: 'test-user' });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/files/download', () => {
  it('should return 401 if user is not authorized', async () => {
    vi.mocked(getUserAuth).mockResolvedValue({ nextAuth: null, userId: undefined });

    const response = await POST(request);
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      body: 'User not authorized',
      errorType: 401,
    });
  });

  it('should return 404 if file does not exist (NoSuchKey error)', async () => {
    vi.mocked(FileService).mockImplementationOnce(
      () =>
        ({
          findFilesByIds: vi.fn().mockResolvedValue([]), // 返回空数组表示未找到文件
          getFileByteArray: vi.fn(),
        }) as any,
    );

    const response = await POST(request);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      body: 'No files found for the given IDs',
      errorType: 404,
    });
  });

  it('should download files successfully and return a zip file', async () => {
    const mockFiles = [
      { id: 'file1', name: 'test1.txt', url: 'http://example.com/file1.txt' },
      { id: 'file2', name: 'test2.txt', url: 'http://example.com/file2.txt' },
    ];
    const mockFileContent1 = 'Hello from file 1';
    const mockFileContent2 = 'Hello from file 2';

    vi.mocked(FileService).mockImplementationOnce(
      () =>
        ({
          findFilesByIds: vi.fn().mockResolvedValue(mockFiles),
          getFileByteArray: vi
            .fn()
            .mockResolvedValueOnce(new TextEncoder().encode(mockFileContent1))
            .mockResolvedValueOnce(new TextEncoder().encode(mockFileContent2)),
        }) as any,
    );

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/zip');
    expect(response.headers.get('content-disposition')).toContain('attachment; filename="LobeHub_batch_download_');

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    expect(buffer.toString('hex', 0, 4)).toBe('504b0304');
  });

  it('should indicate failed files in X-Lobe-Error header if some files fail', async () => {
    const mockFiles = [
      { id: 'file1', name: 'test1.txt', url: 'http://example.com/file1.txt' },
      { id: 'file2', name: 'test2.txt', url: 'http://example.com/file2.txt' },
    ];
    const mockFileContent1 = 'Hello from file 1';

    vi.mocked(FileService).mockImplementationOnce(
      () =>
        ({
          findFilesByIds: vi.fn().mockResolvedValue(mockFiles),
          getFileByteArray: vi
            .fn()
            .mockResolvedValueOnce(new TextEncoder().encode(mockFileContent1))
            .mockResolvedValueOnce(new Uint8Array()), // Empty content simulates failure
        }) as any,
    );

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('x-lobe-error')).toContain(encodeURIComponent('test2.txt'));
  });

    it('should return 500 if all files fail to download', async () => {
    const mockFiles = [
      { id: 'file1', name: 'test1.txt', url: 'http://example.com/file1.txt' },
    ];

    vi.mocked(FileService).mockImplementationOnce(
      () =>
        ({
          findFilesByIds: vi.fn().mockResolvedValue(mockFiles),
          getFileByteArray: vi.fn().mockResolvedValueOnce(new Uint8Array()), // Empty content simulates failure
        }) as any,
    );

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      body: 'All files failed to download.',
      errorType: 500,
    });
  });

  it('should handle general errors during the process', async () => {
    vi.mocked(FileService).mockImplementationOnce(
      () =>
        ({
          findFilesByIds: vi.fn().mockRejectedValue(new Error('Database error')),
          getFileByteArray: vi.fn(),
        }) as any,
    );

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      body: 'Database error',
      errorType: 500,
    });
  });
  it('should return 400 if no file IDs are provided', async () => {
    request = new NextRequest('https://test.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileIds: [] }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      body: 'No file IDs provided',
      errorType: 400,
    });
  });
});
