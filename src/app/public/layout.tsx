// src/app/public/layout.tsx

'use client'; // 1. 将其转换为客户端组件，因为 AppTheme 是客户端组件

import type {Metadata} from 'next';
import React from 'react';

// 2. 导入 AppTheme 组件
import AppTheme from '@/layout/GlobalProvider/AppTheme';

// 由于 'use client' 的存在，Metadata 对象需要以这种方式导出
// 但对于这些公共页面，通常标题是在 page.tsx 中定义的，这里可以保留或简化
export const metadata: Metadata = {
  description: 'LobeChat Public Page',
  title: 'LobeChat',
};

export default function PublicLayout({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{height: '100%'}}>
    <body style={{height: '100%', margin: 0}}>
    {/* 3. 使用 AppTheme 组件包裹 children */}
    {/* 这将为 terms 和 privacy 页面提供完整的主题支持 */}
    <AppTheme>{children}</AppTheme>
    </body>
    </html>
  );
}
