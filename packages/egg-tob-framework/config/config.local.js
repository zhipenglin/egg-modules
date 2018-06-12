const staticPort = Number(process.env.npm_package_staticPort),
    path = require('path'),
    moduleName = process.env.NODE_TARGET || '',
    {list} = require('../customers.config');
module.exports = appInfo => {
    const config = {};
    config.apiProxy = {
        forward: {
            renderView: async (ctx, next) => {

                let module = list.indexOf(moduleName) > -1 ? moduleName : '';
                await ctx.render(module||'index', {
                    m_bole_path: ctx.app.config.getBoleUrl(module),
                    account: {customize: module}
                });
            }
        }
    };
    config.httpclient = {
        request: {
            timeout: 500000,
        }
    };
    // 监控文件变化并重启服务
    config.development = {
        watchDirs: ['app', 'config', 'app.js'],
        ignoreDirs: ['app/view', 'app/static']
    };
    // 模板目录
    config.view = {
        locals: {
            base_domain: '',
            static_path: `http://localhost:${staticPort}/static`,
            head_path: 'uimg.dev3.ifchange.com'
        }
    };
    // 静态资源目录
    config.static = {
        dir: path.join(appInfo.baseDir, 'app/static')
    };
    config.security = {
        xframe: false
    };

    return config;
};
