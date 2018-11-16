const fs = require('fs');
const path = require('path');

module.exports = function fileDisplay(filePath, callback) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach(function(filename) {
        // 获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); // 是文件
            var isDir = stats.isDirectory(); // 是文件夹
            if (isFile) {
              callback(filedir);
            }
            if (isDir) {
              fileDisplay(filedir, callback); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}
