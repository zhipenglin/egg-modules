const address=require('address').ip(),
    protocol = process.env.HTTPS === 'true' ? 'https' : 'http',
    staticServer=`${protocol}://${address}:${process.env.STATIC_PORT}/`;

module.exports=staticServer;
