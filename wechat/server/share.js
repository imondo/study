const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const fly = require('flyio')

const utils = require('./utils.js')
const sign = require('./sign/sign.js')

const app = new Koa()

app.use(bodyParser())

// 测试公众号信息
const APP_ID = `wx085478e6bb636b0d`
const APP_SECRET = `45269d2ff52d25df203b4fdefbd63f5f`

const API_ACCESS_TOEN = `https://api.weixin.qq.com/cgi-bin`

app.use(async ctx => {
  const ctxUrl = ctx.request.url

  if (ctxUrl.includes('/wechat')) {
    const { url, echostr } = utils.getBodyMessage(ctx)
    if (echostr) {
      ctx.body = echostr;
      return echostr;
    }
    try {
      const { data: { access_token } } = await getAccessToken(APP_ID, APP_SECRET)
      const { data: { ticket } } = await getJsapiTicket(access_token)
      const data = sign(ticket, url)
      console.log(data, access_token, ticket)
      ctx.body = {
        code: 200,
        data: Object.assign({ appId: APP_ID }, data),
        msg: ''
      };
    } catch (error) {
      console.log(error);
    }
  }
})

/**
 * 获取 access_token
 * @param {String} appId 
 * @param {String} appsecret 
 */
async function getAccessToken(appId, appsecret) {
  return fly.get(`${API_ACCESS_TOEN}/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`)
}

/**
 * 获取 jsapi_ticket
 * @param {String} token 
 */
async function getJsapiTicket(token) {
  return fly.get(`${API_ACCESS_TOEN}/ticket/getticket?access_token=${token}&type=jsapi`)
}

app.listen(8080, () => {
  console.log('服务启动，监听8080端口')
})