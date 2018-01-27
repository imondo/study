const getUser = require('./../../models/user');

const getName = async (ctx, next) => {
  await next();
  await getUser().then(res => {
    let name = ctx.params.name;
    ctx.type = 'json';
    ctx.body = res.find(v => {
      return v.name === name;
    });
  })
}

module.exports = {
  method: 'get',
  url : '/user/:name',
  asyncFn: getName
}