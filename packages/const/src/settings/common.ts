import { UserGeneralConfig } from '@lobechat/types';

export const DEFAULT_COMMON_SETTINGS: UserGeneralConfig = {
  animationMode: 'disabled',
  // contextMenuMode not set default value, use env to calc
  fontSize: 14,
  highlighterTheme: 'lobe-theme',
  mermaidTheme: 'lobe-theme',
  transitionMode: 'fadeIn',
};
