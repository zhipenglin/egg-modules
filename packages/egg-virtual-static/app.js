module.exports = app => {
    const staticIndex=app.config.coreMiddleware.indexOf('static');
    app.config.coreMiddleware.splice(staticIndex,0,'virtualStatic');

    app.beforeStart(()=>{
        app.logger.info(`${app.name} started successfully`);
    });
};
