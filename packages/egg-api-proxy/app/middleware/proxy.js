module.exports = () => {
  return async (ctx, next) => {
    const { name } = ctx.app.config.apiProxy,
      { defaultHostName } = ctx.app.config.apiProxy.proxy,
      apiPattern = new RegExp(`^(\/${name})?\/api\/`),
      routePath = ctx.url;
    if (apiPattern.test(routePath)) {
      const IS_MINE_API = RegExp.$1;

      const headers = Object.assign({}, ctx.headers),
        hostname = headers.hostname;
      delete headers.host;
      const apiPath = routePath.replace(apiPattern, '/');
      let results = {};

      results = await ctx.fetch(apiPath, {
        method: ctx.method,
        headers,
        hostname: IS_MINE_API ? hostname || 'defaults' : defaultHostName,
        data: ctx.request.body,
      });
      ctx.status = results.status;
      ctx.set(Object.assign({ 'content-type': results.headers['content-type'] }, results.headers['content-disposition'] ? { 'content-disposition': results.headers['content-disposition'] } : {}));
      ctx.body = results.data;
    }

    await next();
  };
};
