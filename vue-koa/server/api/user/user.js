const getUser = require('./../../models/user');

const user = async (ctx, next) => {
  await next();
  await getUser().then(res => {
    ctx.type = 'json';
    ctx.body = res;
  })
}

module.exports = {
  method: 'get',
  url : '/user',
  asyncFn: user
}