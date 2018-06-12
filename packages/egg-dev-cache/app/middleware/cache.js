const md5=require('md5');
const fs=require('fs-extra');
const path=require('path');
module.exports = function() {
    return async function(ctx, next) {
        const reqHash=md5(JSON.stringify({url:ctx.url,headers:ctx.request.headers,data:ctx.request.body}));
        const cachePath=path.resolve(__dirname,'../../.cache',reqHash);
        if(await fs.pathExists(cachePath)){
            let reqData=await fs.readFile(reqHash,'uft8');
            try {
                reqData=JSON.parse(reqData);
                ctx.set(reqData.headers);
                return ctx.body=reqData.body;
            }catch (e) {
                await fs.remove(cachePath);
            }
        }
        await next();

    }
}
