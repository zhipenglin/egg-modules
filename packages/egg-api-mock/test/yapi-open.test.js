const isOpen=require('../lib/yapiOpen'),assert=require('assert').strict;

describe('test/yapi-open-test.js', () => {
    it('* 匹配所有',()=>{
        assert(isOpen('/api/test',true,'*'));
    });
    it('单条规则匹配',()=>{
        assert(isOpen('/api/test',true,'/api/*'));
    });
    it('多条规则匹配',()=>{
        assert(isOpen('/api/test',true,['/test','/api/*']));
    });
    it('关闭',()=>{
        assert.equal(isOpen('/api/test',false,['/test','/api/*']),false);
    });
});
