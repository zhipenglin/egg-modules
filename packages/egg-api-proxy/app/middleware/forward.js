module.exports = function() {
  return async function(ctx, next) {
    const { renderView } = ctx.app.config.apiProxy.forward;
    await next();

    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          err_no: '404',
          err_msg: 'Not Found',
          results: 'Not Found',
        };
      } else {
        await renderView(ctx, next);
      }
    }
  };
};
