const webpack = require('webpack'), config = require('../getWebpackConfig'),{list}=require('../customers.config');

['',...list].forEach((name)=>webpack(config(name), (err, stats) => {
    if(err)
        return console.log(err);
    console.log('build complete');
}));
