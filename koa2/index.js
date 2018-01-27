const Koa = require('koa')
const convent = require('koa-convert');
const loggenerator = require('./midd/generator');
const app = new Koa();

app.use(convent(loggenerator()));

app.use(async (ctx) => {
  ctx.body = 'Hello koa'
})

app.listen(3000);
console.log(3000);