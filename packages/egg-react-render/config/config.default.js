'use strict';

/**
 * egg-api-proxy default config
 * @member Config#apiProxy
 * @property {String} SOME_KEY - some description
 */
exports.apiProxy = {
    name:'',
    forward:{
        renderView: async (ctx,next)=>{
            ctx.body='hello apiProxy forward config';
        }
    },
    proxy:{
        defaultHostName:''
    },
    fetch:{}
};
