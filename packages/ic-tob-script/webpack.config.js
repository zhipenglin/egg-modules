const config=require('./getWebpackConfig'),
    path = require('path'),
    fs = require('fs-extra');



let getCustomize;

try {
    const customizeString=fs.readFileSync(path.resolve(process.cwd(), 'customize.json')),
        customize=JSON.parse(customizeString);;
    getCustomize=(name)=>customize[name];

}catch (e) {
    getCustomize = () => ([])
}


const name=process.env.NODE_TARGET||'';

module.exports = config(name,getCustomize(name));
