const header = {
  'name': '名称',
  'age': '年龄',
  'sex': '性别'
}

const data = [
  {name: '张一', age: '18', sex: '女'},
  {name: '张二', age: '23', sex: '男'},
  {name: '张三', age: '34', sex: '女'},
  {name: '张四', age: '56', sex: '男'}
]

/**
 * @param {Object} header 表格头部
 * @param {Array} body 表格数据
 * @param {String} title 表格导出名称
 * @param {Object} merge 表格表头配置
 * @param {Object} style 表格样式配置
 */
function exportsEXCL() {

  this.downLoad = ({header = {}, body = [], title = 'excel', style = {}, merge = {}}) => {
    let _merge = Object.assign({depth: 2, group: []}, merge);
    console.log(_merge);
    const styleCell = this.setBorderStyle();
    const _headers = Object.values(header)
    .map((v, i) => Object.assign({}, {v, position: String.fromCharCode(65 + i) + 1}))
    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v, s: styleCell}}), {});
    console.log(_headers);
    const _body = body
      .map((v, i) => Object.keys(header).map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })))
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v, s: styleCell}}), {});

    const output = Object.assign({}, _headers, _body);

    const outputPos = Object.keys(output);

    const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        'mySheet': Object.assign({}, output, { '!ref': ref })
      }
    };

    this.setCustStyle(wb, style);
    debugger
    this.save(wb, `${title}.xlsx`);
  };

  this.setCustStyle = (wb, style) => {
    
  }

  this.setBorderStyle = () => {
    const borderAll = {
      top: {
        style: 'thin'
      },
      bottom: {
        style: 'thin'
      },
      left: {
        style: 'thin'
      },
      right: {
        style: 'thin'
      }
    }; 
    // data[key].s = {
    //   border: borderAll,
    //   alignment: {
    //     horizontal: 'center'
    //   }
    // }
    return {border: borderAll}
  };

  this.save = (wb, fileName) => {
    let wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    }
    let xw = XLSX.write(wb, wopts);
    let obj = new Blob(
      [
        this.s2ab(xw)
      ],
      {
        type: ''
      }
    );
    let elem = document.createElement('a');
    elem.download = fileName || '下载';
    elem.href = URL.createObjectURL(obj);
    elem.click();
    setTimeout(function() {
      URL.revokeObjectURL(obj);
    }, 100);
  };

  this.s2ab = s => {
    if (typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  };
}


const doit = new exportsEXCL();

function downLoad() {
  doit.downLoad({
    header: header,
    body: data, 
    merge: {
      group: [
        {startName: 'name', text: '合并', cell: 2}
      ]
    }
  });
}
