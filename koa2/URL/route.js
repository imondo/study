const koa = require('koa');
const router = require('koa-router')();

const app = new koa();

app.use(async (ctx, next) => {
  console.log(ctx.request.method, ctx.request.url);
  await next();
})

router.get('/hello/:name', async (ctx, next) => {
  console.log(ctx);
  let name = ctx.params.name;
  ctx.body = `hello, ${name}`;
})

router.get('/', async (ctx, next) => {
  ctx.body = '<h1>index</h1>';
})

app.use(router.routes());

app.listen(7000);