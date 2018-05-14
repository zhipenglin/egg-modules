'use strict';

const mock = require('egg-mock');
const fs = require('fs-extra');
const path=require('path');
describe('test/api-mock.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/api-mock-test',
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
  it('mock json文件测试',async ()=>{
      const jsonData=await fs.readFile('./test/fixtures/apps/api-mock-test/app/mock/index.json','utf-8');
      return app.httpRequest()
          .get('/index')
          .expect(jsonData)
          .expect(200);
  });
    it('mock js文件测试',async ()=>{
        return app.httpRequest()
            .get('/index_js')
            .expect('hello mock!')
            .expect(200);
    });
});
