const projectName=process.env.npm_package_name;

// 代理运行模式（nginx代理）
exports.proxy = true;

// 日志路径
exports.logger = {
    dir: `/opt/log/${projectName}/logs`,
};

// 合并后的配置文件
exports.rundir = `/opt/log/${projectName}/run`;

exports.getBoleUrl=(module)=>{
    switch (module){
        case 'autoliv':
            return '//m_autoliv_bole.ifchange.com';
        case 'valeo':
            return '//m_valeo_bole.ifchange.com';
        case 'globalegrow':
            return '//m_globalegrow_bole.ifchange.com';
        default:
            //m-bole-v2.ifchange.com
            return '//m-bole.ifchange.com';
    }
};

// 模板变量
exports.view = {
    locals: {
        base_domain: '//www.ifchange.com',
        static_path: `//img.ifchange.com/${projectName}`,
        head_path: '//uimg.ifchange.com'
    },
};
