import { TopicDisplayMode, UserPreference } from '@lobechat/types';

export const DEFAULT_PREFERENCE: UserPreference = {
  guide: {
    moveSettingsToAvatar: true,
    topic: true,
  },
  lab: {
    enableGroupChat: false,
    enableInputMarkdown: false,
  },
  telemetry: null,
  topicDisplayMode: TopicDisplayMode.ByTime,
  useCmdEnterToSend: false,
};
