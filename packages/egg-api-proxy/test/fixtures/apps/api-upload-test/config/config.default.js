'use strict';

exports.keys = '123456';

exports.security = {
    csrf: {
        enable: false
    }
};

exports.apiProxy = {
    fetch: {
        defaults: {
            host:'http://test.dev.cheng95.com'
        },
        bole:{
            host: 'http://192.168.1.110',
            headers: {
                host: 'neitui_bole.wmq.dev3.ifchange.com'
            }
        }
    }
}

exports.multipart = {
    whitelist: [
        '.png',
        '.doc',
        '.docx'
    ],
}

exports.httpclient = {
    request: {
        timeout: 50000,
    }
};

