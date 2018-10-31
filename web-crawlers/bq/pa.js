const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const url = 'http://www.biquge.com.tw';

class HandList {
  async getNavList(ctx, next) {
    await next();
    let navList = [];
    return new Promise(resolve => {
      request.get({url, encoding : null}, function(err, res, body) {
        if (err) {
          console.log(err);
        }
        let html =  iconv.decode(body, 'gbk');
        let $ = cheerio.load(html, {decodeEntities: false});
        $('.nav ul li').each(function(index, elem) {
          let $elem = $(elem);
          let name = $elem.find('a').text();
          let href = $elem.find('a').attr('href');
          navList.push({
            name,
            href
          });
        });
        resolve(navList);
      });
    })
  }
}

module.exports = HandList;
