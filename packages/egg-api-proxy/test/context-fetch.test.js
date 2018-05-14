'use strict';

const mock = require('egg-mock');

const assert = require('assert');

describe('test/context-fetch.test.js', () => {
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

  describe('context fetch()', () => {
    it('ctx上存在fetch方法', () => {
      assert(typeof ctx.fetch === 'function');
    });

    it('发送tob请求', () => {
      const resData = {
        err_no: 0,
        results: 'success',
      };
      app.mockHttpclient('http://www.ifchange.com/api/account/gettopaccountinfo', {
        headers: {
          'content-type': 'application/json;charset=utf-8',
        },
        data: resData,
      });
      return ctx.fetch('/account/gettopaccountinfo', {
        hostname: 'tob',
      }).then(({ data }) => {
        assert.deepEqual(data, resData);
      });
    });
    it('发送法雷奥请求', function() {
      const resData = {
        err_no: 0,
        results: 'success',
      };
      app.mockHttpclient('http://valeo.neitui_hr.cheng95.com/get_info', {
        headers: {
          'content-type': 'application/json;charset=utf-8',
        },
        data: resData,
      });
      return ctx.fetch('/get_info', {
        hostname: 'valeo',
      }).then(({ data }) => {
        assert.deepEqual(data, resData);
      });
    });
  });
});
