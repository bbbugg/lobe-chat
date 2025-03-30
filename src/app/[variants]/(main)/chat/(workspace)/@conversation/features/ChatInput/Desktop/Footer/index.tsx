import { Button, Space } from 'antd';
import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import { Suspense, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import LocalFiles from '@/features/ChatInput/Desktop/FilePreview';
import SaveTopic from '@/features/ChatInput/Topic';
import { useSendMessage } from '@/features/ChatInput/useSend';
import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { isMacOS } from '@/utils/platform';

import MessageFromUrl from './MessageFromUrl';
import SendMore from './SendMore';
import ShortcutHint from './ShortcutHint';

const useStyles = createStyles(({ css, prefixCls, token }) => {
  return {
    arrow: css`
      &.${prefixCls}-btn.${prefixCls}-btn-icon-only {
        width: 28px;
      }
    `,
    loadingButton: css`
      display: flex;
      align-items: center;
    `,
    overrideAntdIcon: css`
      .${prefixCls}-btn.${prefixCls}-btn-icon-only {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${prefixCls}-btn.${prefixCls}-dropdown-trigger {
        &::before {
          background-color: ${rgba(token.colorBgLayout, 0.1)} !important;
        }
      }
    `,
    shiftedFilesContainer: css`
      /* 方案 A: 使用 transform (推荐，不影响布局流) */
      transform: translateY(-16px);

      /* 方案 B: 使用 margin (会影响下方元素的布局) */

      /* margin-bottom: -16px; */

      /* 如果想让下方元素也向上移动填补空间 */

      /* 或者 */

      /* margin-top: -16px; */

      /* 如果想单纯将自身向上拉 */

      /* 可选：如果移动后导致与其他元素重叠，可能需要调整 z-index */

      /* position: relative; */

      /* 需要配合 z-index 或 transform/top 使用 */

      /* z-index: 1; */

      /* 比下方元素高即可，如果下方没有设置 z-index, 1 就够 */
    `,
  };
});

interface FooterProps {
  expand: boolean;
  onExpandChange: (expand: boolean) => void;
}

const Footer = memo<FooterProps>(({ onExpandChange, expand }) => {
  const { t } = useTranslation('chat');

  const { styles } = useStyles();

  const [isAIGenerating, stopGenerateMessage] = useChatStore((s) => [
    chatSelectors.isAIGenerating(s),
    s.stopGenerateMessage,
  ]);

  const { send: sendMessage, canSend } = useSendMessage();

  const [isMac, setIsMac] = useState<boolean>();

  useEffect(() => {
    setIsMac(isMacOS());
  }, [setIsMac]);

  return (
    <>
      <Suspense>
        <MessageFromUrl />
      </Suspense>
      <Flexbox
        align={'end'}
        className={styles.overrideAntdIcon}
        distribution={'space-between'}
        flex={'none'}
        gap={8}
        horizontal
        padding={'0 24px'}
      >
        <Flexbox align={'center'} gap={8} horizontal style={{ overflow: 'hidden' }}>
          {expand && (
            <Flexbox className={styles.shiftedFilesContainer}>
              {' '}
              {/* 应用移动样式 */}
              <LocalFiles />
            </Flexbox>
          )}
        </Flexbox>
        <Flexbox align={'center'} flex={'none'} gap={8} horizontal>
          <ShortcutHint />
          <SaveTopic />
          <Flexbox style={{ minWidth: 92 }}>
            {isAIGenerating ? (
              <Button
                className={styles.loadingButton}
                icon={<StopLoadingIcon />}
                onClick={stopGenerateMessage}
              >
                {t('input.stop')}
              </Button>
            ) : (
              <Space.Compact>
                <Button
                  disabled={!canSend}
                  loading={!canSend}
                  onClick={() => {
                    sendMessage();
                    onExpandChange?.(false);
                  }}
                  type={'primary'}
                >
                  {t('input.send')}
                </Button>
                <SendMore disabled={!canSend} isMac={isMac} />
              </Space.Compact>
            )}
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;
