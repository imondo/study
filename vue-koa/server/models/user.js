const connection = require('./../controller/index');

const getUser = () => {
  return new Promise((resolve, reject) => {
    connection.query('select * from `persiones`', function(err, rows) {
      if (err) {
        reject(err);
      } else {
        let userList = [];
        for (let row of rows) {
          let user = {
            id: row.id,
            name: row.name
          }
          userList.push(user);
        }
        resolve(userList);
      }
    });
  })
}

module.exports = getUser;