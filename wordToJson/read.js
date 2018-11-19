const fs = require('fs');

const fileOper = require('node-file-oper');


getList();

const allAPI = [];

function getList() {
  fileOper.readFloder('./files', function(file) {
    let fileData = getFilesJson(file);
    if (fileData) {
      allAPI.push(...fileData);
      fileOper.write(`./JSON`, `allAPI.json`, JSON.stringify({data: allAPI}));
    }
  });
}

function getFilesJson(file) {
  let data = fs.readFileSync(file, 'utf-8');
  let _arr = data.match(/(ajaxURL(\w|\/|-|_|\+|")+)/g);

  if (_arr) {
    let arr = _arr.reduce((a, v) => {
      if (v.includes('ajaxURL+"/')) {
        let i = v.replace(/ajaxURL\+"/, '').replace(/"(\+\S*)?/, '');
        a.push(i);
      }
      console.log(a);
      return a;
    }, []);
    return arr;
  } else {
    return null;
  }
}
