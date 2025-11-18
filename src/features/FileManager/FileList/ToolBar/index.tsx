import { App } from 'antd';
import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { fetchErrorNotification } from '@/components/Error/fetchErrorNotification';
import { useAddFilesToKnowledgeBaseModal } from '@/features/KnowledgeBaseModal';
import { useFileStore } from '@/store/file';
import { useKnowledgeBaseStore } from '@/store/knowledgeBase';
import { downloadFile } from '@/utils/client/downloadFile';
import { isChunkingUnsupported } from '@/utils/isChunkingUnsupported';

import Config from './Config';
import MultiSelectActions, { MultiSelectActionType } from './MultiSelectActions';
import ViewSwitcher, { ViewMode } from './ViewSwitcher';

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  container: css`
    height: 40px;
    padding-block-end: 12px;
    border-block-end: 1px solid ${isDarkMode ? token.colorSplit : rgba(token.colorSplit, 0.06)};
  `,
}));

interface MultiSelectActionsProps {
  config: { showFilesInKnowledgeBase: boolean };
  downloading: boolean;
  knowledgeBaseId?: string;
  onConfigChange: (config: { showFilesInKnowledgeBase: boolean }) => void;
  onViewChange: (view: ViewMode) => void;
  selectCount: number;
  selectFileIds: string[];
  setDownloading: (downloading: boolean) => void;
  setSelectedFileIds: (ids: string[]) => void;
  showConfig?: boolean;
  total?: number;
  totalFileIds: string[];
  viewMode: ViewMode;
}

const ToolBar = memo<MultiSelectActionsProps>(
  ({
    selectCount,
    showConfig,
    setSelectedFileIds,
    selectFileIds,
    total,
    totalFileIds,
    config,
    onConfigChange,
    knowledgeBaseId,
    viewMode,
    onViewChange,
    downloading,
    setDownloading,
  }) => {
    const { styles } = useStyles();
    const { t } = useTranslation('components');

    const [removeFiles, parseFilesToChunks, fileList] = useFileStore((s) => [
      s.removeFiles,
      s.parseFilesToChunks,
      s.fileList,
    ]);
    const [removeFromKnowledgeBase] = useKnowledgeBaseStore((s) => [
      s.removeFilesFromKnowledgeBase,
    ]);

    const { open } = useAddFilesToKnowledgeBaseModal();
    const { message } = App.useApp();

    const onActionClick = useCallback(async (type: MultiSelectActionType) => {
      if (downloading) return; // 下载中禁用所有操作

      switch (type) {
        case 'delete': {
          await removeFiles(selectFileIds);
          setSelectedFileIds([]);

          return;
        }
        case 'removeFromKnowledgeBase': {
          if (!knowledgeBaseId) return;

          await removeFromKnowledgeBase(knowledgeBaseId, selectFileIds);
          setSelectedFileIds([]);
          return;
        }
        case 'addToKnowledgeBase': {
          open({
            fileIds: selectFileIds,
            onClose: () => setSelectedFileIds([]),
          });
          return;
        }
        case 'addToOtherKnowledgeBase': {
          open({
            fileIds: selectFileIds,
            knowledgeBaseId,
            onClose: () => setSelectedFileIds([]),
          });
          return;
        }

        case 'batchChunking': {
          const chunkableFileIds = selectFileIds.filter((id) => {
            const file = fileList.find((f) => f.id === id);
            return file && !isChunkingUnsupported(file.fileType);
          });
          await parseFilesToChunks(chunkableFileIds, { skipExist: true });
          setSelectedFileIds([]);
          return;
        }

        case 'batchDownload': {
          if (selectFileIds.length === 1) {
            const file = fileList.find((f) => f.id === selectFileIds[0]);
            if (file) {
              downloadFile(file.url, file.name);
              setSelectedFileIds([]);
            } else {
              message.error(t('FileManager.actions.batchDownloadFailed'));
            }
            return;
          }
          setDownloading(true);
          message.loading(t('FileManager.actions.batchDownloading'));
          try {
            const res = await fetch('/webapi/files/download', {
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ fileIds: selectFileIds }),
              method: 'POST',
            });

            const lobeError = res.headers.get('X-Lobe-Error');

            // 有压缩成功的文件，返回压缩包
            if (lobeError) {
              const decodedError = decodeURIComponent(lobeError);
              fetchErrorNotification.error({
                errorMessage: `${t('FileManager.actions.batchDownloadFailed')}: ${decodedError}`,//todo
                status: 500,
              });
            }

            // 所有文件下载失败，返回错误信息
            if (!res.ok) {
              const text = await res.text();
              let bodyMsg = text;
              try {
                const json = JSON.parse(text);
                if (json && typeof json === 'object' && 'body' in json) {
                  bodyMsg = (json as any).body;
                }
              } catch { /* empty */ }
              fetchErrorNotification.error({
                errorMessage: `${t('FileManager.actions.batchDownloadFailed')}: ${bodyMsg}`,
                status: 500,
              });
              return; // 会执行finally
            }

            const blob = await res.blob();
            const disposition = res.headers.get('content-disposition');
            let filename = 'download.zip';

            if (disposition) {
              const filenameMatch = disposition.match(/filename="(.+)"$/);
              if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
              }
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            if (!lobeError) {
              setSelectedFileIds([]);
              message.success(t('FileManager.actions.batchDownloadSuccess'));
            }
          } catch (error) {
            fetchErrorNotification.error({
              errorMessage: `${t('FileManager.actions.batchDownloadFailed')}: ${error}`,
              status: 500,
            });
          } finally {
            setDownloading(false);
          }
          return;
        }
      }
    }, [selectFileIds, downloading, fileList, knowledgeBaseId]);

    const isInKnowledgeBase = !!knowledgeBaseId;
    return (
      <Flexbox align={'center'} className={styles.container} horizontal justify={'space-between'}>
        <MultiSelectActions
          downloading={downloading}
          isInKnowledgeBase={isInKnowledgeBase}
          onActionClick={onActionClick}
          onClickCheckbox={() => {
            setSelectedFileIds(selectCount === total ? [] : totalFileIds);
          }}
          selectCount={selectCount}
          total={total}
        />
        <Flexbox gap={8} horizontal>
          <ViewSwitcher onViewChange={onViewChange} view={viewMode} />
          {showConfig && <Config config={config} onConfigChange={onConfigChange} />}
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ToolBar;
