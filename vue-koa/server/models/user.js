const query = require('./index');
// 查询
const getUser = () => {
  let sql = 'select * from `user`';
  return query(sql);
}

// 新增
const addUser = (value) => {
  let sql = 'insert into user (user_name, password) values (?,?)';
  return query(sql, value);
}

// 更新
const putUser = (value) => {
  let sql = 'update user set user_name=?, password=? where id=?';
  return query(sql, value);
}

// 删除
const delUser = (value) => {
  let sql = 'delete from user where id=?';
  return query(sql, value);
}

module.exports = {
  getUser,
  addUser,
  putUser,
  delUser
};