const {devTarget,getFeatures}=require('ic-get-customize-config'),
    config=require('./getWebpackConfig'),
    name=devTarget||'';
module.exports = config(name,getFeatures(name));
