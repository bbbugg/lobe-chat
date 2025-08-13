import type { Metadata } from 'next';
import React from 'react';

// 2. 导入我们刚刚创建的客户端主题注册表组件
import ThemeRegistry from './ThemeRegistry';

// 3. 在服务器组件中安全地导出 metadata
export const metadata: Metadata = {
  description: 'Public pages for our service',
  title: {
    default: 'LobeChat', // 默认标题
    template: '%s | LobeChat', // 页面标题模板
  },
};

export default function PublicLayout({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
    <body style={{ height: '100%', margin: 0 }}>
    {/*
          4. 使用 ThemeRegistry 组件包裹 children。
          这样，布局本身仍然是服务器组件，可以处理 metadata，
          而主题功能则被委托给了客户端组件 ThemeRegistry。
        */}
    <ThemeRegistry>{children}</ThemeRegistry>
    </body>
    </html>
  );
}
