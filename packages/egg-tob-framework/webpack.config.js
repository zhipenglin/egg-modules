const config=require('./getWebpackConfig');
module.exports = config(process.env.NODE_TARGET||'');
