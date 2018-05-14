const assert = require('assert'),
  getConfig = require('../lib/getConfig');
describe('test/getConfig.test.js', function() {
  const fetchConfig = {
    defaults: {
      host: 'http://192.168.1.110',
      headers: {
        host: 'neitui_hr.yzy.dev3.ifchange.com',
      },
    },
    valeo: {
      host: 'http://192.168.1.110',
      headers: {
        host: 'valeo_neitui_hr.wmq.dev3.ifchange.com',
      },
    },
  };
  it('无hostname参数', () => {
    assert.deepEqual(getConfig(fetchConfig, undefined, '/aip/getName'), fetchConfig.defaults);
  });
  it('当前的hostname没有找到对应配置', () => {
    assert.deepEqual(getConfig(fetchConfig, 'webank', '/aip/getName'), fetchConfig.defaults);
  });
  it('无scope配置', () => {
    assert.deepEqual(getConfig(fetchConfig, 'valeo', '/aip/getName'), fetchConfig.valeo);
  });
  describe('添加scope正则', () => {
    const fetchConfig = {
      defaults: {
        host: 'http://192.168.1.110',
        headers: {
          host: 'neitui_hr.yzy.dev3.ifchange.com',
        },
      },
      valeo: {
        host: 'http://192.168.1.110',
        headers: {
          host: 'valeo_neitui_hr.wmq.dev3.ifchange.com',
        },
        scope: /^\/api\/getName(\/)?$/,
      },
    };
    it('url匹配', () => {
      assert.deepEqual(getConfig(fetchConfig, 'valeo', '/api/getName'), fetchConfig.valeo);
    });
    it('/结尾的url匹配', () => {
      assert.deepEqual(getConfig(fetchConfig, 'valeo', '/api/getName/'), fetchConfig.valeo);
    });
    it('url不匹配返回默认参数', () => {
      assert.deepEqual(getConfig(fetchConfig, 'valeo', '/api/getAge/'), fetchConfig.defaults);
    });
  });
  describe('添加scope数组白名单', () => {
    const fetchConfig = {
      defaults: {
        host: 'http://192.168.1.110',
        headers: {
          host: 'neitui_hr.yzy.dev3.ifchange.com',
        },
      },
      valeo: {
        host: 'http://192.168.1.110',
        headers: {
          host: 'valeo_neitui_hr.wmq.dev3.ifchange.com',
        },
        scope: [
          '/api/getName',
        ],
      },
    };
    it('url匹配', () => {
      assert.deepEqual(getConfig(fetchConfig, 'valeo', '/api/getName'), fetchConfig.valeo);
    });
    it('url不匹配返回默认参数', () => {
      assert.deepEqual(getConfig(fetchConfig, 'valeo', '/api/getAge'), fetchConfig.defaults);
    });
  });
});
