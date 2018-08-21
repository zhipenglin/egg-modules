const httpProxy = require('http-proxy'),address=require('address').ip();
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const staticServer=`${protocol}://${address}:${process.env.staticPort}/`;
module.exports = () => {
    const proxy = httpProxy.createProxyServer();
    return async (ctx, next) => {
        if (/^\/(static|sockjs-node)\//.test(ctx.path)) {
            return new Promise(resolve => {
                proxy.web(ctx.req, ctx.res, {
                    target: staticServer
                }, e => {
                    resolve();
                });
            })
        } else {
            next();
            const res = await ctx.curl(staticServer, {
                headers: ctx.headers
            });
            try {
                ctx.body = await ctx.renderString(res.data.toString());
            } catch (e) {
                ctx.body =res.data.toString();
            }

        }
    }
};
