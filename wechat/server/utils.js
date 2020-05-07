module.exports = {
  // 获取code和下发的消息
  getBodyMessage(ctx) {
    const { query } = ctx.request;
    console.log(query)
    return query;
  },
  postBodyMessage(ctx) {
    const { body } = ctx.request;
    console.log(query)
    return body;
  }
}