import { TRPCClientError } from '@trpc/client';
import { Unsubscribable } from '@trpc/server/observable';

import { LambdaRouter } from '@/server/routers/lambda';
import {
  BatchDownloadEventType,
  CheckFileHashResult,
  FileItem,
  UploadFileParams,
} from '@/types/files';

export type TrpcSubscriptionCallback = {
  onComplete?: () => void;
  onData?: (data: BatchDownloadEventType) => void;
  onError?: (err: TRPCClientError<LambdaRouter>) => void;
};

export interface IFileService {
  batchDownload(fileIds: string[], callbacks: TrpcSubscriptionCallback): Unsubscribable;
  checkFileHash(hash: string): Promise<CheckFileHashResult>;
  createFile(
    file: UploadFileParams,
    knowledgeBaseId?: string,
  ): Promise<{ id: string; url: string }>;
  getFile(id: string): Promise<FileItem>;
  removeAllFiles(): Promise<any>;
  removeFile(id: string): Promise<void>;
  removeFiles(ids: string[]): Promise<void>;
}
