const jwt = require('jsonwebtoken');
const secret = require('./../config/secret.json');
const bcrypt = require('bcryptjs');
const handleUser = require('./../models/user');

const login = async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  await handleUser.getUser().then(res => {
    let userInfo = res.find(v => { return v.name == data.name});
    console.log(bcrypt);
    ctx.type = 'json';
    if (userInfo != undefined) {
      if (!bcrypt.compareSync(data.pass, userInfo.pass)) {
        ctx.body = {
          success: false,
          msg: '密码不正确'
        }
      } else {
        const userToken = {
          name: userInfo.name,
          id: userInfo.id
        }
        const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})  // 签发token
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