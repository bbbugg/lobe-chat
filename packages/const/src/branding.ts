// the code below can only be modified with commercial license
// if you want to use it in the commercial usage
// please contact us for more information: hello@lobehub.com

export const LOBE_CHAT_CLOUD = 'LobeHub Cloud';

export const BRANDING_NAME = process.env.NEXT_PUBLIC_BRANDING_NAME || 'LobeHub';
export const BRANDING_LOGO_URL = '/icons/cutecat.svg';

export const ORG_NAME = 'LobeHub';

export const BRANDING_URL = {
  help: undefined,
  privacy: '/public/privacy',
  terms: '/public/terms',
};

export const SOCIAL_URL = {
  discord: 'https://discord.gg/AYFPHvv2jT',
  github: 'https://github.com/lobehub',
  medium: 'https://medium.com/@lobehub',
  x: 'https://x.com/lobehub',
  youtube: 'https://www.youtube.com/@lobehub',
};

// 1. 从环境变量中读取域名
// process.env.NEXT_PUBLIC_BRANDING_DOMAIN 会在构建时被Vercel替换为真实值
// || 'example.com' 是一个备用值，如果在本地开发时没有设置环境变量，就会使用它，防止程序出错
const domain = process.env.NEXT_PUBLIC_BRANDING_DOMAIN || 'lobehub.com';

// 2. 使用读取到的域名动态生成邮箱地址
export const BRANDING_EMAIL = {
  business: `hello@${domain}`, // 使用模板字符串拼接
  support: `support@${domain}`, // 使用模板字符串拼接
};
