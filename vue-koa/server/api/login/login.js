const login = async (ctx, next) => {
  await next();
  ctx.body = 'login';
}

module.exports = {
  method: 'get',
  url : '/login',
  asyncFn: login
}