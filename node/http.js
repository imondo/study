const http = require('http');

http.createServer((req, res) => {
  console.log('开始 ');
  res.write('Hello');
  res.end();
}).listen(3000);