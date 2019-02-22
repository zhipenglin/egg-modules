const httpProxy = require('http-proxy'),
    staticServer = require('../../lib/staticServer');
module.exports = () => {
    const proxy = httpProxy.createProxyServer();
    return async (ctx, next) => {
        if (/^\/(static|sockjs-node|third-party)\//.test(ctx.path) || /.(js|jsx|css|scss|sass|less|png|jpg|jpeg|bmp)$/.test(ctx.path)) {
            return new Promise(resolve => {
                proxy.web(ctx.req, ctx.res, {
                    target: staticServer
                }, e => {
                    resolve();
                });
            })
        } else {
            await next();
            if (ctx.body) {
                return;
            }
            ctx.body = await ctx.renderVirtual();
        }
    }
};
