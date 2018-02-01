const query = require('./index');
// 查询
const getUser = () => {
  let sql = 'select * from `users`';
  return query(sql);
}

// 新增
const addUser = (value) => {
  let sql = 'insert into users (name, pass) values (?,?)';
  return query(sql, value);
}

// 更新
const putUser = (value) => {
  let sql = 'update users set name=?, moment=? where id=?';
  return query(sql, value);
}

// 删除
const delUser = (value) => {
  let sql = 'delete from users where id=?';
  return query(sql, value);
}

module.exports = {
  getUser,
  addUser,
  putUser,
  delUser
};