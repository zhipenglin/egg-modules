const {devTarget} = require('ic-get-customize-config');
const getAccount = require('../lib/getAccount');
const staticPort = Number(process.env.npm_package_staticPort);
module.exports = appInfo => {
    const config = exports = {};

    // 日志路径
    config.logger = {
        dir: 'logs',
    };
    // 合并后的配置文件
    config.rundir = 'run';

    config.view = {
        locals: {
            static_path: `http://localhost:${staticPort}/static`
        }
    };

    config.apiProxy = {
        forward: {
            async renderView(ctx) {
                let account = await getAccount(ctx,devTarget);
                await ctx.render(devTarget || 'index', {account: Object.assign({}, account, {customize: devTarget})});
            }
        },
        fetch: {
            defaults: {
                host: 'http://192.168.1.110',
                headers: {
                    host: 'neitui_bole.wmq.dev3.ifchange.com'
                }
            },
            vanke:{
                host: 'http://192.168.1.110',
                headers: {
                    host: 'vanke_neitui_bole.wmq.dev3.ifchange.com'
                }
            }
        }
    };

    config.logger = {
        consoleLevel: 'ERROR'
    }
    return config;
}
