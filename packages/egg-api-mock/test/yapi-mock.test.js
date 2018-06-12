'use strict';

const mock = require('egg-mock');
describe('test/yapi-open.test.js', () => {
    let app;
    before(() => {
        app = mock.app({
            baseDir: 'apps/api-yapi-mock-test',
        });
        return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('should GET /', () => {
        return app.httpRequest()
            .get('/')
            .expect('hi, apiMock')
            .expect(200);
    });
    it('yapi mock接口测试',async ()=>{
        const resData={
            err_no:0,
            results:'yapi mock成功'
        };
        app.mockHttpclient('http://yapi.zhinanzhen.wiki/mock/71/resume/upload_photo_base64', {
            headers: {
                'content-type': 'application/json;charset=utf-8'
            },
            data: resData,
        });
        return app.httpRequest()
            .get('/api/resume/upload_photo_base64')
            .expect(resData)
            .expect(200);
    });
});
