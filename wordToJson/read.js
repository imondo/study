const fs = require('fs');

const readFloder = require('./readFloder');

const write = require('./writer');


getList();

function getList() {
  var num = 0;
  readFloder('./files', function(file) {
    let fileData = getFilesJson(file);
    if (fileData) {
      num++;
      write(`${num}`, fileData);
    }
  });
}

function getFilesJson(file) {
  let data = fs.readFileSync(file, 'utf-8');
  let _arr = data.match(/(ajaxURL(\w|\/|-|_|\+|")+)/g);

  if (_arr) {
    let arr = _arr.reduce((a, v) => {
      if (v.includes('ajaxURL+"/')) {
        let i = v.replace(/ajaxURL\+"/, '');
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
