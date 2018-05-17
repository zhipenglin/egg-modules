module.exports = app => {
    app.beforeStart(async () => {
        app.locals = Object.assign(app.locals, app.config.view.locals);
    });
};
