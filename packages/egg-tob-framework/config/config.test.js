const projectName = process.env.npm_package_name;

exports.httpclient={
    request: {
        timeout: 500000,
    }
};

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
            return '//m.autoliv_bole.testing2.ifchange.com';
        case 'valeo':
            return '//m.valeo_bole.testing2.ifchange.com';
        case 'globalegrow':
            return '//m.globalegrow_bole.testing2.ifchange.com';
        default:
            return '//m.bole_v2.testing2.ifchange.com';
    }
};

// 模板变量
exports.view = {
    locals: {
        base_domain: '//testing2.ifchange.com',
        static_path: `//img.testing2.ifchange.com/${projectName}`,
        head_path: '//uimg.testing2.ifchange.com'
    },
};
