import { register as otelRegister } from '@lobechat/observability-otel/node';



import { version } from '../package.json';





export async function register() {
  // 1) 全局代理（仅当设置了代理变量时启用）
  const proxy =
    process.env.HTTPS_PROXY ||
    process.env.HTTP_PROXY ||
    process.env.HTTP_PROXY_URL || // 可选自定义变量
    process.env.https_proxy ||
    process.env.http_proxy;

  console.info('[instrumentation] Proxy =', proxy || '∅');

  if (proxy) {
    try {
      const { ProxyAgent, setGlobalDispatcher } = await import('undici');
      setGlobalDispatcher(new ProxyAgent({ uri: proxy }));
      console.info('[instrumentation] ProxyAgent installed');
    } catch (e) {
      console.warn('[instrumentation] Failed to install ProxyAgent:', e);
    }
  }

  // 2) 原有 OTEL 初始化
  try {
    otelRegister({ version });
    console.info('[instrumentation] OTEL registered, version =', version);
  } catch (e) {
    console.warn('[instrumentation] OTEL register failed:', e);
  }
}
