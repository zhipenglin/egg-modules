const moduleName = process.env.NODE_TARGET || '',
    projectName = process.env.npm_package_name,
    port = Number(process.env.npm_package_port),
    {list} = require('../customers.config');

exports.apiProxy = {
    forward: {
        renderView: async (ctx, next) => {
            let module = list.indexOf(moduleName) > -1 ? moduleName : 'index';
            await ctx.render(module, {
                m_bole_path: ctx.app.config.getBoleUrl(module),
                account: {customize: module}
            });
        }
    }
};


// 日志路径
exports.logger = {
    dir: `/opt/log/${projectName}/logs`,
};

// 合并后的配置文件
exports.rundir = `/opt/log/${projectName}/run`;

// 模板变量
exports.view = {
    locals: {
        base_domain: '',
        static_path: `//192.168.1.97:${port}`,
        head_path: '//uimg.dev3.ifchange.com'
    },
};

exports.security = {
    xframe: false
};
