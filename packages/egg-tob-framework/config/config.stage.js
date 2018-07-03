const {devTarget} = require('ic-get-customize-config');

exports.apiProxy = {
    forward: {
        renderView: async (ctx, next) => {
            await ctx.render(devTarget||'index', {
                m_bole_path: ctx.app.config.getBoleUrl(devTarget),
                account: {customize: devTarget}
            });
        }
    }
};


// 日志路径
exports.logger = {
    dir: `../logs`,
};

// 合并后的配置文件
exports.rundir = `../run`;

exports.static = {
    prefix: '/referral'
};

// 模板变量
exports.view = {
    locals: {
        base_domain: '',
        static_path: `/referral`,
        head_path: '//uimg.dev3.ifchange.com'
    },
};

exports.security = {
    xframe: false
};
