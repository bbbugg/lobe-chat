import { createStyles } from 'antd-style';
import { lighten } from 'polished';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { fileChatSelectors, useFileStore } from '@/store/file';

import FileItem from './FileItem';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    overflow-x: scroll;
    position: relative; // 添加相对定位，z-index才能生效
    z-index: 1; // 或者更高的值，确保它在拖拽条之上

    width: 100%;
    border-start-start-radius: 8px;
    border-start-end-radius: 8px;

    background: ${lighten(0.01, token.colorBgLayout)};

    // 可能需要添加滚动条样式，使其在不同浏览器上更明显
    &::-webkit-scrollbar {
      height: 8px; // 设置滚动条高度
    }
    &::-webkit-scrollbar-thumb {
      background: ${token.colorFill}; // 设置滑块颜色
      border-radius: 4px;
    }
  `,
}));

const FileList = memo(() => {
  const inputFilesList = useFileStore(fileChatSelectors.chatUploadFileList);
  const showFileList = useFileStore(fileChatSelectors.chatUploadFileListHasItem);
  const { styles } = useStyles();

  if (!inputFilesList.length) return null;

  return (
    <Flexbox
      className={styles.container}
      gap={6}
      horizontal
      padding={showFileList ? '16px 16px 12px' : 0}
    >
      {inputFilesList.map((item) => (
        <FileItem key={item.id} {...item} />
      ))}
    </Flexbox>
  );
});

export default FileList;
