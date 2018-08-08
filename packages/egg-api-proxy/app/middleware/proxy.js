const formstream=require('formstream');
const normalizeHeaderName=require('../../lib/normalizeHeaderName');
module.exports = () => {
    return async (ctx, next) => {
        const {name} = ctx.app.config.apiProxy,
            {defaultHostName} = ctx.app.config.apiProxy.proxy,
            apiPattern = new RegExp(`^(\/${name})?\/api\/`),
            routePath = ctx.url;
        const {customize} = ctx.query;
        if (apiPattern.test(routePath)) {
            const IS_MINE_API = RegExp.$1;

            const headers = Object.assign({}, ctx.headers),
                hostname = headers.hostname;
            const customizeHostName = customize || '';
            delete headers.host;
            const apiPath = routePath.replace(apiPattern, '/');
            let results = {};

            const fetchOptions={
                method: ctx.method,
                headers,
                hostname: IS_MINE_API ? hostname || 'defaults' : defaultHostName,
                customizeHostName: customizeHostName,
                data: ctx.request.body,
            };

            if(ctx.is('multipart')){
                const form = formstream();
                const stream = await ctx.getFileStream();
                form.stream(stream.fieldname, stream, stream.filename);
                const headers = form.headers();
                normalizeHeaderName(headers,'content-type');
                fetchOptions.headers=Object.assign({},fetchOptions.headers,headers);
                fetchOptions.stream=form;
                delete fetchOptions.data;
            }

            try{
                results = await ctx.fetch(apiPath, fetchOptions);
            }catch(e){
                results={
                    status:500,
                    headers:{},
                    data:{
                        err_no:500||e.code,
                        err_msg:e.name||e.message
                    }
                };
            }


            ctx.status = results.status;
            ctx.set(Object.assign({
                'content-type': results.headers['content-type'],
                'set-cookie': results.headers['set-cookie']
            }, results.headers['content-disposition'] ? {'content-disposition': results.headers['content-disposition']} : {}));
            return ctx.body = results.data;
        }

        await next();
    };
};
