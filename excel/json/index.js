function saveAs(obj, fileName) { //当然可以自定义简单的下载文件实现方式 
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj); //绑定a标签
  tmpa.click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
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
}]; //....
const wopts = {
  bookType: 'xlsx',
  bookSST: true,
  type: 'binary'
}; //这里的数据是用来定义导出的格式类型 
function downloadExl(data, type) {
  var wb = {
    SheetNames: ['Sheet1'],
    Sheets: {},
    Props: {}
  };
  //wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
  data = XLSX.utils.json_to_sheet(data);

  data["B1"] = {
    t: "s",
    v: "合并"
  };
  data["D1"] = {
    t: "s",
    v: "合并2"
  }
  data["!merges"] = [{ //合并第一行数据[B1,C1,D1,E1]
    s: { //s为开始
      c: 1, //开始列
      r: 0 //开始取值范围
    },
    e: { //e结束
      c: 2, //结束列
      r: 0 //结束范围
    }
  }, { //合并第一行数据[B1,C1,D1,E1]
    s: { //s为开始
      c: 3, //开始列
      r: 5 //开始取值范围
    },
    e: { //e结束
      c: 4, //结束列
      r: 5 //结束范围
    }
  }];
   data["B1"].s = {
     font: {
       sz: 18,
       bold: true
     },
     alignment: {
       horizontal: 'center'
     }
   }; //<====设置xlsx单元格样式
  wb.Sheets['Sheet1'] = data;
  saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], {
    type: "application/octet-stream"
  }), "这里是下载的文件名" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
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
