'use strict';

const mock = require('egg-mock');
const formstream = require('formstream');
const urllib = require('urllib');
const path=require('path');
const fs=require('fs');

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

    /*it('should upload file',async () => {
        const form = formstream();
        const stream=fs.createReadStream(path.resolve(__dirname,'./logo.png'));
        form.stream('file', stream, 'upload-logo.png');
        const headers = form.headers();
        const res = await urllib.request(host+'/api/42.php', {
            method: 'POST',
            headers,
            timeout: 50000,
            stream: form,
        });
        console.log(res.data.toString());
    });*/

    it('should upload file2',async () => {
        const form = formstream();
        const stream=fs.createReadStream(path.resolve(__dirname,'./test.docx'));
        form.stream('resume', stream, 'test.docx');
        const headers = form.headers();
        const res = await urllib.request(host+'/api/resume/upload_resume', {
            method: 'POST',
            headers:Object.assign({},headers,{
                hostname:'bole',
                cookie: 'undefined; Webstorm-38969289=a82d6f18-87f1-47ee-ad98-e54c114b7dd2; _ga=GA1.1.1124814967.1525661773; UM_distinctid=1636d23dd4129f-0bbd5060bebb97-33677f06-1fa400-1636d23dd42e02; EGG_SESS=yDBFZfxmf8fjHibhTULLBFCfOhzzw1zLKni8lUuxcLgpJiPYXdfsS8JieH-KQj_Z; SERVERID=1; CNZZDATA1273163269=1116143123-1526541513-%7C1528110495; CNZZDATA1273163279=2062332883-1526612767-%7C1528263152; toc_neitui_bole=o96qe754g7b1sfn37b7iq1p44sllnecb',
                accept: '*!/!*'
            }),
            timeout: 50000,
            stream: form,
        });
        console.log(res.data.toString());
    });
});
