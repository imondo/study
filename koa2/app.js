const Koa = require('koa');
const app = new Koa();
const controllers = require('./config/controller');

const a = true;

app.use(controllers());

app.use(async (ctx, next) => {
  if (a) {
    await next();
  } else {
    ctx.type = 'json';
    ctx.body = {
      a: 0
    }
  }
})

app.use(async (ctx, next) => {
  await next();
  ctx.type = 'text/html';
  ctx.body = '<h1>你好，Koa2</h1>'
})

app.listen(3000);
console.log(3000);