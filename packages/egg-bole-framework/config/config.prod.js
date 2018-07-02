// 代理运行模式（nginx代理）
exports.proxy = true;

const projectName = process.env.npm_package_name;
// 日志路径
exports.logger = {
    dir: `/opt/log/${projectName}/logs`,
};
// 合并后的配置文件
exports.rundir = `/opt/log/${projectName}/run`;

exports.apiProxy={
    fetch:{
        defaults:{
            host: 'http://neitui_bole.ifchange.com:9090'
        },
        vanke:{
            host: 'http://vanke_neitui_bole.ifchange.com:9090'
        }
    }
};

exports.view = {
    locals: {
        share_path:'https://zhinanzhen.ai',
        head_path: 'http://uimg.ifchange.com'
    }
};
