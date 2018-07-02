const projectName = process.env.npm_package_name;
// 日志路径
exports.logger = {
    dir: 'logs',
};
// 合并后的配置文件
exports.rundir = 'run';

exports.apiProxy={
    fetch:{
        defaults:{
            host: 'http://neitui_bole.testing2.ifchange.com'
        },
        vanke:{
            host:'http://vanke.neitui_bole.testing2.ifchange.com'
        }
    }
};

exports.view = {
    locals: {
        share_path:'https://testing.zhinanzhen.ai',
        head_path: 'http://uimg.testing2.ifchange.com'
    }
};
