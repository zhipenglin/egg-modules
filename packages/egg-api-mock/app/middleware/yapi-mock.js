const path = require('path'),
    isOpen=require('../../lib/yapiOpen');

module.exports = function () {
    return async function (ctx, next) {
        const {name} = ctx.app.config.apiProxy,
            apiPattern = new RegExp(`^(\/${name})?\/api\/`),
            routePath = ctx.url,
            {id, base, urls, open} = ctx.app.config.apiMock.yapi;
        if(apiPattern.test(routePath)){
            const apiPath = routePath.replace(apiPattern, '/');
            if (isOpen(apiPath, open, urls)) {
                const headers=Object.assign({},ctx.headers);
                delete headers['host'];
                const results = await ctx.fetch(`${base}/${path.join(id, apiPath)}`,{
                    method:ctx.method,
                    data:ctx.data,
                    headers:headers
                });
                return ctx.body = results.data;
            }
        }

        await next();
    }
};
