const fs = require('fs');

module.exports = function(dir, data) {
  fs.writeFile( `./${dir}.json`, JSON.stringify({
    data
  }), function (err) {
    if (err) throw err;
    console.log('写入完成');
  });
}