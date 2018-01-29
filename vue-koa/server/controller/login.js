const handleUser = require('./../models/user');
const jwt = require('koa-jwt');

const login = async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  handleUser.getUser().then(res => {
    let userInfo = res.find(v => {v.user_name == userInfo.name});
    ctx.type = 'json';
    if (userInfo != undefined) {
      if (userInfo.password !== data.password) {
        ctx.body = {
          success: false,
          msg: '密码不正确'
        }
      } else {
        const userToken = {
          name: userInfo.name,
          id: userInfo.id
        }
        const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
        const token = jwt.sign(userToken,secret); // 签发token
        ctx.body = {
          success: true,
          token: token, // 返回token
        }
      }
    } else {
      ctx.body = {
        success: false,
        msg: '用户不存在'
      }
    }
  })
}

module.exports = {
  login
}