const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new koa();

app.use(bodyParser());

router.get('/index', async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = `<h1>Index</h1>
        <form action="/sigin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
})

router.post('/sigin', async (ctx, next) => {
  let name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(name, password);

  if (name === 'koa' && password === '123456') {
    ctx.response.body = `Hello, ${name}`;
  } else {
    ctx.response.type = 'json';
    ctx.response.body = {
      code: 300,
      message: 'error login'
    }
  }

})

app.use(router.routes());

app.listen(7000);