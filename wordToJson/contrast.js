const fs = require('fs');

const fileOper = require('node-file-oper');

const data = fs.readFileSync('./api.json', 'utf-8');

const api = JSON.parse(data);

const noApi = [];

fileOper.readFloder('./allAPI', function(file){
  let _d = fs.readFileSync(file, 'utf-8');
  let mjs = JSON.parse(_d);
  for (let v of api.data) {
    if (!(mjs.data.includes(v))) {
      noApi.push(v);
      fileOper.write('./', 'noAPI.json', JSON.stringify({data: noApi}));
    }
  }

})
