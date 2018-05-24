const isOpen=require('../lib/yapiOpen'),assert=require('assert');

describe('test/yapi-open-test.js', () => {
    it('* 匹配所有',()=>{
        assert(isOpen('/api/test',true,'*'),true);
    });
    it('单条规则匹配',()=>{
        assert(isOpen('/api/test',true,'/api/*'),true);
    });
    it('多条规则匹配',()=>{
        assert(isOpen('/api/test',true,['/test','/api/*']),true);
    });
    it('关闭',()=>{
        assert(isOpen('/api/test',false,['/test','/api/*']),false);
    });
});
