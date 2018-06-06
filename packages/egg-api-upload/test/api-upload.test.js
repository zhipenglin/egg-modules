'use strict';

const mock = require('egg-mock');
const formstream = require('formstream');
const urllib = require('urllib');
const path=require('path');

describe('test/api-upload.test.js', () => {
    let app,server,host;
    before(() => {
        app = mock.app({
            baseDir: 'apps/api-upload-test',
        });
        return app.ready();
    });
    before(()=>{
        server = app.listen();
        host = 'http://127.0.0.1:' + server.address().port;
    });
    after(() => app.close());
    afterEach(mock.restore);

    it('should GET /', () => {
        return app.httpRequest()
            .get('/')
            .expect('hi, apiUpload')
            .expect(200);
    });

    it('should upload file',async () => {
        const form = formstream();
        form.file('file', path.resolve(__dirname,'./logo.png'), 'upload-logo.png');
        const headers = form.headers();
        const res = await urllib.request(host+'/api/update', {
            method: 'POST',
            headers,
            stream: form,
        });
        //console.log(res);
    });
});
