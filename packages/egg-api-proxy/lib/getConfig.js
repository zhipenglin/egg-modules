const {get} = require('lodash'),
    minimatch = require("minimatch");
module.exports = (config, hostname, url) => {
    config = Object.assign({
        defaults: {},
    }, config);
    if (!hostname || hostname === 'defaults' || !config[hostname]) {
        return config.defaults;
    }
    let scope = get(config[hostname], 'scope') || [];
    if (!Array.isArray(scope)) scope = [scope];
    if (scope.length === 0 || scope.some(match => {
        if (match instanceof RegExp) return match.test(url);
        return minimatch(match, url);
    })) {
        return config[hostname];
    }
    return config.defaults;
};
