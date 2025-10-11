// Runs on the Node.js runtime only
// Next.js will call this on server start
export async function register() {
  const proxy =
    process.env.HTTPS_PROXY ||
    process.env.HTTP_PROXY ||
    process.env.HTTP_PROXY_URL || // optional custom var
    process.env.http_proxy ||
    process.env.https_proxy;

  if (!proxy) return;

  const { setGlobalDispatcher, ProxyAgent } = await import('undici');

  // Simple global proxy for all outbound HTTP(S) requests
  // NOTE: ProxyAgent itself does not handle NO_PROXY automatically
  setGlobalDispatcher(new ProxyAgent({ uri: proxy }));
}
