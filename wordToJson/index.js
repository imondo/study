const path = require('path');
const parser = require('word-text-parser');

const fileOper = require('node-file-oper');

const absPath = path.join(__dirname, './api.docx');

parser(absPath, function(resultList){
  const arrs = resultList.reduce((arr , v) => {
    if (v.includes('/api')) {
      let a = v.replace(/((POST)|(GET)|(DELETE)|(PUT))\s+\/api/, '');
      arr.push(a);
    }
    return arr;
  }, []);
  console.log(arrs.length);
  fileOper.write('./', 'docAPI.json', JSON.stringify({data: arrs}));
})