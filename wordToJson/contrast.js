const fs = require('fs');

const readFloder = require('./readFloder');

const data = fs.readFileSync('./api.json', 'utf-8');

const api = JSON.parse(data);

const noApi = [];

readFloder('./json', function(file){
  let _d = fs.readFileSync(file, 'utf-8');
  let mjs = JSON.parse(_d);
  for (let v of mjs.data) {
    if (!api.data.indexOf(v) > -1) {
      noApi.push(v);
    }
  }
  console.log(noApi);

})
