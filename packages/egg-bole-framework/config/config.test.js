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
            host: 'http://neitui_bole.testing2.ifchange.com:9090'
        },
        vanke:{
            host:'http://vanke.neitui_bole.testing2.ifchange.com:9090'
        }
    }
};

exports.view = {
    locals: {
        share_path:'https://testing.zhinanzhen.ai',
        head_path: 'http://uimg.testing2.ifchange.com'
    },
};
