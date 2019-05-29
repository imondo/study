const fs = require('fs');
const zlib = require('zlib');

const rs = fs.createReadStream('index.html');
const gz = zlib.createGzip();
const ws = fs.createWriteStream('index.zip');

rs.pipe(gz).pipe(ws);

rs.on('error', err => {
  console.log(err);
});

ws.on('finish', () => {
  console.log('zip成功');
});