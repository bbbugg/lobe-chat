import React from 'react';

import TermsContent from './TermsContent'; // 导入我们刚刚创建的客户端组件

// 这个文件是服务器组件，所以可以安全地导出 metadata
export const metadata = {
  title: 'Terms of Service',
};

// 这个页面组件本身非常简单，只是渲染了客户端组件
const Page = () => {
  return <TermsContent />;
};

export default Page;
