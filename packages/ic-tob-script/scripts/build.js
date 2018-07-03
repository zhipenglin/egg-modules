const webpack = require('webpack'),
    config = require('../getWebpackConfig'),
    {updateList,getFeatures}=require('ic-get-customize-config');

updateList.forEach((name) => webpack(config(name,getFeatures(name)), (err, stats) => {
    if (err)
        return console.log(err);
    console.log('build complete');
}));
