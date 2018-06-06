const path=require('path');
const formstream = require('formstream');
module.exports = () => {
    return async (ctx, next) => {
        if(ctx.is('multipart')){
            const stream = await ctx.getFileStream();
            const name = 'egg-multipart-test/' + path.basename(stream.filename);
            console.log(stream.filename);
        }
        next();
    }
};
