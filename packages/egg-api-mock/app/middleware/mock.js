/**
 * @name: ic-mock ;
 * @author: linzp ;
 * @description: egg.js中mock数据的中间件 ;
 * */
const minimatch = require("minimatch"),
    path = require('path'),
    get = require('lodash/get'),
    fs = require('fs-extra');

module.exports = function () {
    return async function (ctx, next) {
        const mockDataPath=ctx.app.config.apiMock.mockDataPath;
        const config = ctx.app.config.apiMock.urls || {};
        for (let url in config) {
            if (minimatch(ctx.path, url)) {
                let mockFilePath, configUrl = get(config[url], 'path'), configMethod = get(config[url], 'method');
                if (typeof config[url] === 'string') {
                    mockFilePath = path.join(ctx.app.baseDir, mockDataPath, config[url]);
                } else if (typeof configUrl === 'string') {
                    mockFilePath = path.join(ctx.app.baseDir, mockDataPath, url);
                } else {
                    return await next();
                }

                if (typeof configMethod === 'string' && configMethod !== ctx.method) {
                    return await next();
                }

                if (path.extname(mockFilePath) === '.js') {
                    const mockModule = require(mockFilePath);
                    if (typeof mockModule === 'function') {
                        return ctx.body =await mockModule({request:ctx.request});
                    } else {
                        return await next();
                    }
                } else if (path.extname(mockFilePath) === '.json') {
                    return ctx.body = await fs.readFile(mockFilePath,'utf-8');
                }
            }
        }
        await next();
    };
};
