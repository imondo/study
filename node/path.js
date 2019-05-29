const path = require('path');

let str = `/root/node/http.js`;

const base = path.basename(str); // 文件名
console.log(base); // http.js

const dir = path.dirname(str); // 目录路径
console.log(dir); // /root/node

const ext = path.extname(str); // 文件后缀名
console.log(ext); // .js

let root = path.resolve('root', './c'); // path.resolve() 路径解析，简单来说就是拼凑路径，最终返回一个绝对路径 
console.log(root); // F:\workspace\demo\node\root\c

// 一般用来打印绝对路径，就像下面这样，其中 __dirname 指的就是当前目录
let rootx = path.resolve(__dirname, 'build');
console.log(rootx); // F:\workspace\demo\node\build
