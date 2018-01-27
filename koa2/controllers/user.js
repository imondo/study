const user = async (ctx, next) => {
  await next();
  let name = ctx.params.name;
  ctx.body = `Hello, ${name}`;
}

module.exports = {
  method: 'get',
  url: '/hello/:name',
  asyncFn: user
}