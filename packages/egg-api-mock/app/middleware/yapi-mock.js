const path = require('path'),
    isOpen=require('../../lib/yapiOpen');

module.exports = function () {
    return async function (ctx, next) {
        const {name} = ctx.app.config.apiProxy,
            apiPattern = new RegExp(`^(\/${name})?\/api\/`),
            routePath = ctx.path,
            {id, base, urls, open} = ctx.app.config.apiMock.yapi;
        if(apiPattern.test(routePath)){
            const apiPath = routePath.replace(apiPattern, '/');
            if (isOpen(apiPath, open, urls)) {
                const results = await ctx.fetch(`${base}/${path.join(id, apiPath)}`);
                return ctx.body = results.data;
            }
        }

        await next();
    }
};
