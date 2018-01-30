const handleUser = require('./../models/user');

const getUser = async (ctx, next) => {
  await next();
  await handleUser.getUser().then((res) => {
    let userList = [];
    for (let row of res) {
      let user = {
        id: row.id,
        name: row.user_name,
        password: row.password
      }
      userList.push(user);
    }
    ctx.type = 'json';
    ctx.body = ctx.params.id ? userList.find(v => v.id == ctx.params.id) : userList;
  })
}

const getDetailUser = async (ctx, next) => {
  await next();
  await handleUser.getUser().then((res) => {
    ctx.type = 'json';
    ctx.body = res.find(v => v.id == ctx.params.id);
  })
}

const putUser = async (ctx, next) => {
  await next();
  let {user_name, password, id} = ctx.request.body;
  ctx.type = 'json';
  await handleUser.putUser([user_name, password, id]).then(() => {
    ctx.body = {
      msg: '修改成功'
    }
  }).catch((error) => {
    ctx.body = {
      msg: '修改失败'
    }
  })
}

const addUser = async (ctx, next) => {
  await next();
  let {name, password} = ctx.request.body;
  ctx.type = 'json';
  await handleUser.addUser([name, password]).then(() => {
    ctx.body = {
      msg: '添加成功'
    }
  }).catch((error) => {
    ctx.body = {
      msg: '添加失败'
    }
  })
}

const delUser = async (ctx, next) => {
  await next();
  let delId = ctx.params.id;
  await handleUser.delUser([delId]).then(() => {
    ctx.body = {
      msg: '删除成功'
    }
  }).catch((error) => {
    ctx.body = {
      msg: '删除失败'
    }
  })
}

module.exports = {
  getUser,
  getDetailUser,
  addUser,
  putUser,
  delUser
}