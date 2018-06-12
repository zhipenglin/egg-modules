'use strict';

/**
 * egg-api-mock default config
 * @member Config#apiMock
 * @property {String} SOME_KEY - some description
 */
exports.apiMock = {
    mockDataPath:'/app/mock',
    yapi:{
        id:'',
        base:'http://yapi.zhinanzhen.wiki/mock',
        open:false,
        urls:'*'
    },
    urls:{}
};
