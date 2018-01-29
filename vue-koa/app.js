const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');
const router = require('./server/routes/index');
const config = require('./build/index');

const port = process.env.PORT || 3000;

const staticPath = `${config.assetsPublicPath}`;

const app = new Koa();

app.use(bodyParser());

app.use(router.routes());

app.use(historyApiFallback());

app.use(static(
  path.join(__dirname,  staticPath)
));

app.listen(port, () => {
  console.log(`访问端口http://localhost:${port}`);
});