const fly = require('flyio')

module.exports = {
  // 获取code和下发的消息
  getBodyMessage(ctx) {
    const { query } = ctx.request;
    console.log(query)
    return query;
  },
  postBodyMessage(ctx) {
    const { body } = ctx.request;
    console.log(`请求body: ` + JSON.stringify(body))
    return body;
  },
  /**
   * 获取 access_token
   * @param {String} appId 
   * @param {String} appsecret 
   */
  async getAccessToken(appId, appsecret) {
    try {
      const API_ACCESS_TOEN = `https://api.weixin.qq.com/cgi-bin`
      return fly.get(`${API_ACCESS_TOEN}/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`)
    } catch (error) {
      console.log(error)
    }
  }
}