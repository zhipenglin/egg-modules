'use strict';

const mock = require('egg-mock');

const assert = require('assert');

describe('test/api-proxy.test.js', () => {
    let app,
        ctx;
    before(() => {
        app = mock.app({
            baseDir: 'apps/api-proxy-test',
        });
        return app.ready().then(() => {
            ctx = app.mockContext();
        });
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('should GET /', () => {
        return app.httpRequest()
            .get('/')
            .expect('hi, apiProxy')
            .expect(200);
    });
    it('should GET /forward', () => {
        return app.httpRequest()
            .get('/forward')
            .expect('hello apiProxy forward config')
            .expect(200);
    });

    it('GET proxy default /api/get_info', () => {
        const resData = {
            err_no: 0,
            results: 'success',
        };
        app.mockHttpclient('http://neitui_hr.cheng95.com/get_info', {
            headers: {
                'content-type': 'application/json;charset=utf-8',
            },
            data: resData,
        });
        return app.httpRequest()
            .get('/api/get_info')
            .expect(resData)
            .expect(200);
    });

    it('GET proxy valeo /api/get_info', () => {
        const resData = {
            err_no: 0,
            results: 'success',
        };
        app.mockHttpclient('http://valeo.neitui_hr.cheng95.com/get_info', {
            headers: {
                'content-type': 'application/json;charset=utf-8'
            },
            data: resData,
        });
        return app.httpRequest()
            .get('/api/get_info')
            .set('hostname', 'valeo')
            .expect(resData)
            .expect(200);
    });
});
