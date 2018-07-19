'use strict';
const path = require('path'),
    {getModule} = require('../customers.config'),
    get = require('lodash/get'),
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

                    const account = await Promise.all([
                        ctx.fetch(`/account/gettopaccountinfo`, {
                            headers: headers,
                            hostname: 'tob'
                        }).then(({data}) => get(data, 'results')),
                        ctx.fetch(`/common/get_config`, {headers: headers}).then(({data}) => get(data, 'results')).catch((e) => {
                            ctx.app.logger.error(e);
                            return {};
                        })
                    ]).then(([account, config]) => {
                        account.referralConfig = config;
                        return account;
                    });
                    const uid = get(account, 'uid');
                    if (uid) {
                        const module = getModule && getModule(account);
                        await ctx.render(module || 'index', {
                            m_bole_path: ctx.app.config.getBoleUrl(module),
                            account: Object.assign({}, account, {customize: module})
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
                return '//m-autoliv-bole.ifchange.com';
            case 'valeo':
                return '//m.valeo_bole.ifchange.com';
            default:
                return '//m-bole-v2.ifchange.com';
        }
    };

    return config;
};
