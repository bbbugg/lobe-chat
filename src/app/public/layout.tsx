// src/app/public/layout.tsx

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
    // 【修复】为 <html> 添加 height: '100%'
    <html lang="en" style={{ height: '100%' }}>
    {/* 【修复】为 <body> 添加 height: '100%' 和 margin: 0 */}
    <body style={{ height: '100%', margin: 0 }}>
    {/*
          现在，children (也就是你的 TermsContent 组件)
          的父容器就有了一个固定的、占满全屏的高度，
          它内部的 height: '100%' 样式就能正确生效了。
        */}
    {children}
    </body>
    </html>
  );
}
