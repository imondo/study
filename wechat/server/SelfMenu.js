const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const fly = require('flyio')

const utils = require('./utils.js')

const app = new Koa()

app.use(bodyParser())

// 测试公众号信息
const APP_ID = `wx085478e6bb636b0d`
const APP_SECRET = `45269d2ff52d25df203b4fdefbd63f5f`

app.use(async ctx => {
  const ctxUrl = ctx.request.url
  ctx.set("Access-Control-Allow-Origin", "*");

  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  if (ctxUrl.includes('/wechat')) {
    const menu = utils.postBodyMessage(ctx)
    console.log(menu);
    try {
      const { data: { access_token } } = await utils.getAccessToken(APP_ID, APP_SECRET)
      await setSelfMenu(access_token, menu)
      ctx.body = {
        code: 200,
        data: null,
        msg: '成功'
      };
    } catch (error) {
      console.log(error);
    }
  }
})

/**
 * 请求设置自定义菜单
 * @param {String} token 
 */
async function setSelfMenu(token, data) {
  console.log(token, data)
  return fly.post(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`, JSON.stringify(data))
}

app.listen(8080, () => {
  console.log('服务启动，监听8080端口')
})