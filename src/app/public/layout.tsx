import type { Metadata } from 'next';
import React from 'react';

// 你可以在这里定义整个网站的默认元数据（比如标题、描述），对SEO友好
export const metadata: Metadata = {
  description: '',
  title: '', // 可以改成你的网站名
};

// 这就是根布局组件
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode; // 'children' 是一个特殊的 prop，它代表被包裹的子组件（在这里就是你的 page.tsx）
}) {
  return (
    <html lang="en">
    <body>
    {/*
          你的所有页面内容 (page.tsx) 都会被渲染到这里
          所以 {children} 是必须的
        */}
    {children}
    </body>
    </html>
  );
}
