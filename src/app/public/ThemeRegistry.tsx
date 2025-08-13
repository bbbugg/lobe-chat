'use client';

import React from 'react';

// 导入 AppTheme 组件
import AppTheme from '@/layout/GlobalProvider/AppTheme';

// 这个组件的作用很简单：就是作为一个客户端边界，
// 接收服务器组件传递过来的 children，然后用 AppTheme 将其包裹。
export default function ThemeRegistry({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  return <AppTheme>{children}</AppTheme>;
}
