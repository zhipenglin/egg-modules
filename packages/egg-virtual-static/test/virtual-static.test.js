'use strict';

const mock = require('egg-mock');

describe('test/virtual-static.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/virtual-static-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, virtualStatic')
      .expect(200);
  });
});
