const cheerio = require('cheerio');
const http = require('https');
const iconv = require('iconv-lite');

const url = 'https://www.qu.la/'; // http://www.ygdy8.net/html/gndy/dyzz/index.html

http.get(url, function(sres) {
  let chunks = [];
  sres.on('data', function(chunk) {
    chunks.push(chunk);
  });
  
  sres.on('end', function() {
    let titles = [];
    // 需要对其进行转码，否则乱码
    let html = iconv.decode(Buffer.concat(chunks), 'utf8');
    let $ = cheerio.load(html, {decodeEntities: false});
    $('.nav ul li').each(function (idx, element) {
      let $element = $(element);
      titles.push({
        title: $element.find('a').text()
      })
    })    
    console.log(titles);     
  });
});