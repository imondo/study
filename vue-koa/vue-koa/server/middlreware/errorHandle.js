module.exports = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        message: '权限验证失败',
      };
    } else {
      throw err;
    }
  });
}