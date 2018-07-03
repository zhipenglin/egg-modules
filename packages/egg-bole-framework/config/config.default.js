'use strict';

const path = require('path'),
    projectName = process.env.npm_package_name,
    port = Number(process.env.npm_package_port);
const getAccount = require('../lib/getAccount');
const list = require('ic-get-customize-config').all;
module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1526264241783_1856';

    config.bodyParser = {
        qs: {
            parse: (str, opts) => require('querystring').parse(str, null, null, opts)
        },
        jsonLimit: '10mb',
        formLimit: '10mb'
    };

    config.multipart = {
        whitelist: [
            '.doc',
            '.docx',
            '.txt',
            '.html',
            '.htm',
            '.pdf',
            '.mht',
            '.png',
            '.jpg',
            '.jpeg',
            '.gif'
        ],
        fileSize: '10mb'
    }

    config.httpclient = {
        request: {
            timeout: 25000,
        }
    };

    config.view = {
        // 模板变量
        locals: {
            siteTitle: 'e成',
            static_path: '',
            head_path: 'http://uimg.dev3.ifchange.com',
            share_path: 'https://zhinanzhen.ai'
        },
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.html',
        root: path.join(appInfo.baseDir, 'app/view'),
    };

    // 静态资源配置
    config.static = {
        prefix: '',
        dir: path.join(appInfo.baseDir, 'dist/static'),
    };

    // apiProxy插件配置
    config.apiProxy = {
        name: projectName,
        forward: {
            async renderView(ctx) {
                let module = ctx.request.headers['customize'];
                if (list.indexOf(module) === -1) {
                    module = '';
                }
                const account = await getAccount(ctx,module);
                await ctx.render(module || 'index', {account: Object.assign({}, account, {customize: module})});
            }
        },
        proxy: {
            defaultHostName: ''
        },

        fetch: {}
    };

    config.cluster = {
        listen: {
            port
        }
    };

    config.security = {
        csrf: {
            enable: false
        }
    };

    return config;
};
