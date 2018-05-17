'use strict';
const path = require('path'),
    {getModule} = require('../customers.config'),
    projectName = process.env.npm_package_name, port = Number(process.env.npm_package_port);
module.exports = appInfo => {
    const config = {};

    /**
     * some description
     * @member Config#test
     * @property {String} key - some description
     */
    config.test = {
        key: appInfo.name + '_1511788532548_5403',
    };

    config.bodyParser = {
        qs: {
            parse: (str, opts) => require('querystring').parse(str, null, null, opts)
        }
    };

    config.httpclient = {
        request: {
            timeout: 25000,
        }
    };

    // 模板配置
    config.view = {
        // 模板变量
        locals: {
            siteTitle: 'e成',
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

    //apiProxy插件配置
    config.apiProxy = {
        name: projectName,
        forward: {
            renderView: async (ctx) => {
                try {
                    const headers = Object.assign({}, ctx.headers);
                    delete headers.host;
                    const account = await ctx.fetch(`/account/gettopaccountinfo`, {
                        headers: headers,
                        hostname: 'tob'
                    });
                    const uid = get(account, 'data.results.uid');
                    if (uid) {
                        const module = getModule && getModule(account.data.results);
                        await ctx.render(module || 'index', {
                            m_bole_path: ctx.app.config.getBoleUrl(module),
                            account: Object.assign({}, account.data.results, {customize: module})
                        });
                    } else {
                        await ctx.redirect(`/?referer=${encodeURIComponent(ctx.url)}`);
                    }
                } catch (e) {
                    ctx.app.logger.error(e);
                    ctx.body = {
                        err_no: '500',
                        err_msg: '/account/gettopaccountinfo 接口请求异常'
                    };
                }
            }
        },
        proxy: {
            defaultHostName: 'tob'
        }
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

    config.getBoleUrl = (module) => {
        switch (module) {
            case 'autoliv':
                return '//m_autoliv_bole.ifchange.com';
            case 'valeo':
                return '//m.valeo_bole.ifchange.com';
            default:
                return '//m.bole_v2.ifchange.com';
        }
    };

    return config;
};
