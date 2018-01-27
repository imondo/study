const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.body = 'index page';
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.path === '/test') {
    ctx.response.body = 'TEST page';
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.path === '/error') {
    ctx.response.body = 'ERROR page';
  } else {
    await next();
  }
});

app.listen(7000);
console.log(7000);