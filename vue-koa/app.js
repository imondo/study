const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');
const controllers = require('./server/controller/controllers');
const config = require('./build/index');

const port = process.env.PORT || 3000;

const staticPath = `${config.assetsPublicPath}`;

const app = new Koa();

app.use(controllers('api'));

app.use(historyApiFallback());

app.use(static(
  path.join( __dirname,  staticPath)
));

app.listen(port, () => {
  console.log(`访问端口http://localhost:${port}`);
});