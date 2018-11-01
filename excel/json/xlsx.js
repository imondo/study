function saveAs(obj, fileName) {
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj);
  tmpa.click();
  setTimeout(function () {
      URL.revokeObjectURL(obj);
  }, 100);
}
var jsono = [{ //测试数据
  "id": 1, //A
  "合并的列头1": "数据11", //B
  "合并的列头2": "数据12", //C
  "合并的列头3": "数据13", //D
  "合并的列头4": "数据14", //E
}, {
  "id": 2,
  "合并的列头1": "数据21",
  "合并的列头2": "数据22",
  "合并的列头3": "数据23",
  "合并的列头4": "数据24",
}, {
  "id": 3,
  "合并的列头1": "数据21",
  "合并的列头2": "数据22",
  "合并的列头3": "数据23",
  "合并的列头4": "数据24",
}, {
  "id": 4,
  "合并的列头1": "数据21",
  "合并的列头2": "数据22",
  "合并的列头3": "数据23",
  "合并的列头4": "数据24",
}];
const wopts = { bookType: 'xlsx', bookSST: true, type: 'binary', cellStyles: true };
function downloadExl(json, type) {
  var tmpdata = json[0];
  json.unshift({});
  var keyMap = []; //获取keys
  for (var k in tmpdata) {
      keyMap.push(k);
      json[0][k] = k;
  }
  var tmpdata = [];//用来保存转换好的json 
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
      v: v.v
  });
  var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
  tmpdata["B1"].s = { font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } }, fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } } };//<====设置xlsx单元格样式
  tmpdata["!merges"] = [{
      s: { c: 1, r: 0 },
      e: { c: 2, r: 0 }
  },{
    s: { c: 3, r: 0 },
    e: { c: 4, r: 0 }
}];//<====合并单元格 
  var tmpWB = {
      SheetNames: ['mySheet'], //保存的表标题
      Sheets: {
          'mySheet': Object.assign({},
              tmpdata, //内容
              {
                  '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
              })
      }
  };
  tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
      { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
  ))], {
          type: ""
      });
  saveAs(tmpDown, "文件" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
}
function getCharCol(n) {
  let temCol = '',
      s = '',
      m = 0
  while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
  }
  return s
}
function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  }
}