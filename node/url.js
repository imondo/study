const url = require('url');
const querystring = require('querystring');

const site = `https://baidu.com/a/index.html?id=aaa&&usr=bbb`;

// url.parse() 解析网址，true 的意思是把参数解析成对象
const urlObj = url.parse(site, true);
console.log(urlObj);

const query = 'a=1&b=2&c=3&a=3';;
const qobj = querystring.parse(query); // 如果参数重复，其所对应的值会变成数组
console.log(qobj); // { a: [ '1', '3' ], b: '2', c: '3' }

const q = querystring.stringify(qobj);
console.log(q); // a=1&a=3&b=2&c=3