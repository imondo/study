module.exports = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        message: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  });
}