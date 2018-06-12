'use strict';

const mock = require('egg-mock');

describe('test/dev-cache.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/dev-cache-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, devCache')
      .expect(200);
  });
});
