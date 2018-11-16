const fs = require('fs');

module.exports = function(dir, data) {
  console.log(dir)
  fs.writeFile( `./json/${dir}.json`, JSON.stringify({
    data
  }), function (err) {
    console.log(err);
    if (err) throw err;
    console.log('写入完成');
  });
}