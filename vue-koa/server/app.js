const Koa = require('koa');
const logger = require('koa-logger');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');
const jwt = require('koa-jwt');
const secret = require('./config/secret.json');
const errorHandle = require('./middlreware/errorHandle');
const responseFormatter = require('./middlreware/responseFormatter');
const router = require('./routes/index');
const config = require('./../build/index');

const port = process.env.PORT || 3000;

const staticPath = `${config.assetsPublicPath}`;

const app = new Koa();

app.use(errorHandle);
app.use(logger()); // 打印错误日志
app.use(bodyParser());
app.use(responseFormatter);

app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/user\/add/]}));

app.use(router.routes(), router.allowedMethods());

app.use(historyApiFallback());

app.use(static(
  path.join(__dirname,  staticPath)
));

app.listen(port, () => {
  console.log(`访问端口http://localhost:${port}`);
});