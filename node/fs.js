const fs = require('fs');

fs.writeFile('./text.js', '写入文件内容', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('写入成功');
  }
});

fs.readFile('./http.js', (err, file) => {
  if (err) {
    console.log(err);
  } else {
    console.log('内容：', file.toString());
  }
});

// 读取流
const rs = fs.createReadStream('./index.html');
// 写入流
const ws = fs.createWriteStream('./read.html');

rs.pipe(ws); //// 用 pipe 将 rs 和 ws 衔接起来，将读取流的数据传到输出流

rs.on('error', err => {
  console.log(err);
});

ws.on('finish', () => {
  console.log('写入成功');
});