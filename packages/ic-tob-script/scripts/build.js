const webpack = require('webpack'),
    config = require('../getWebpackConfig'),
    {list} = require('egg-tob-framework/customers.config'),
    path = require('path'), fs = require('fs-extra');

fs.readFile(path.resolve(process.cwd(), 'customize.json'))
    .then((customizeString) => (name) =>{
        const customize=JSON.parse(customizeString);
        return customize[name];
    }, () => () => ([]))
    .then((getCustomize) => {
        ['', ...list].forEach((name) => webpack(config(name,getCustomize(name)), (err, stats) => {
            if (err)
                return console.log(err);
            console.log('build complete');
        }));
    });
