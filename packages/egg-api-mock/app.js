const assert = require('assert');
module.exports = app => {
    const index = app.config.coreMiddleware.indexOf('proxy');
    assert(index >= 0, 'proxy 中间件必须存在');

    app.config.coreMiddleware.splice(index, 0, 'mock','yapiMock');
};
