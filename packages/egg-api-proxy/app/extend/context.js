const qs = require('qs'),
    {get} = require('lodash'),
    getConfig = require('../../lib/getConfig'),
    normalizeHeaderName = require('../../lib/normalizeHeaderName');

module.exports = {
    async fetch(url, options, callback) {
        options = options || {};
        let dataType = options.dataType;
        delete options.dataType;

        if (!/^https?:\/\//.test(url)) {
            const proxyConfig = getConfig(this.app.config.apiProxy.fetch, options.hostname || options.customizeHostName || get(options, 'headers.hostname'), url);
            // 1. 如果传入的为相对路径，则自动拼接域名，并设置默认返回类型为 json
            url = proxyConfig.host + url;
            dataType = dataType || 'json';

            // 2. 将 proxy 配置的默认 headers 合并进去
            if (options.headers) {
                delete options.headers.host;
                delete options.headers['content-length'];
            }
            options.headers = Object.assign({}, proxyConfig.headers, options.headers);
        }

        normalizeHeaderName(options.headers,'content-type');

        if(typeof options.data === 'object'){
            if(options.headers['content-type']==='application/x-www-form-urlencoded'){
                options.data = qs.stringify(options.data);
            }else{
                options.data = JSON.stringify(options.data);
            }
        }

        // 将处理后的参数转发给 ctx.curl
        this.app.logger.info(JSON.stringify(Object.assign({}, options, {url})));
        const results = await this.curl(url, options, callback);
        // json 解析容错
        const contentType = get(results, '[\'headers\'][\'content-type\']', '');
        if (contentType.indexOf('json') > -1) {
            try {
                results.data = JSON.parse(results.data);
            } catch (e) {
            }
        }
        if (Buffer.isBuffer(results.data) && contentType.indexOf('text') > -1) {
            results.data = results.data.toString();
        }
        this.app.logger.info(JSON.stringify(results.data));
        return results;
    },
};
