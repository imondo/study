const Koa = require('koa');
const HandList = require('./pa.js');
const write = require('../writer');

const app = new Koa();
const handList = new HandList();

app.use(async (ctx, next) => {
  let nav = await handList.getNavList(ctx, next);
  console.log(nav);
  write('nav', nav);
  ctx.body = JSON.stringify(nav);
});


app.listen(3000, () => {
  console.log('开始监听')
});