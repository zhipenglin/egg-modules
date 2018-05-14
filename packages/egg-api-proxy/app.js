module.exports = app => {
    app.config.coreMiddleware.push('proxy');
    app.config.coreMiddleware.push('forward');
};
