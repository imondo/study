const header = [
  { name: '名称' },
  { age: '年龄' },
  { sex: '性别' },
  { work: '经验' },
  { edu: '学历' }
];

const data = [
  { name: '张一', age: '18', sex: '女', work: 2, edu: '本科' },
  { name: '张二', age: '23', sex: '男', work: 5, edu: '博士' },
  { name: '张三', age: '34', sex: '女', work: 2, edu: '大专' },
  { name: '张四', age: '56', sex: '男', work: 6, edu: '本科' }
];

/**
 * @param {Array} header 表格头部
 * @param {Array} body 表格数据
 * @param {String} title 表格导出名称
 * @param {Boolean} hasTitle 是否需要表格标题
 */
function ExportsEXCL() {
  this.downLoad = ({
    header = [],
    body = [],
    title = 'excel',
    hasTitle = false,
  }) => {
    const styleCell = this.setBorderStyle();

    const _headers = header
      .map((v, i) => {
        let key = Object.keys(v);
        return Object.assign(
          {},
          {
            v: `${v[key[0]]}<key>${key[0]}`,
            position: String.fromCharCode(65 + i) + (hasTitle ? 1 : 0)
          }
        );
      })
      .reduce(
        (prev, next) =>
          Object.assign({}, prev, {
            [next.position]: { v: next.v, s: styleCell }
          }),
        {}
      );
    const _body = body
      .map((v, i) =>
        header.map((k, j) => {
          let key = Object.keys(k);
          return Object.assign(
            {},
            {
              v: v[key[0]],
              position: String.fromCharCode(65 + j) + (i + (hasTitle ? 2 : 1))
            }
          );
        })
      )
      .reduce((prev, next) => prev.concat(next))
      .reduce(
        (prev, next) =>
          Object.assign({}, prev, {
            [next.position]: { v: next.v, s: styleCell }
          }),
        {}
      );

    const mergeThead = this.setMergeThead(_headers, hasTitle, title);

    const _merges = this.setTableMerges(header, _headers, hasTitle);

    const _thead = this.setTableThead(mergeThead);

    const output = Object.assign({}, _thead, _body);

    const outputPos = Object.keys(output).sort();

    const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign({}, output, { '!ref': ref, '!merges': _merges })
      }
    };

    this.save(wb, `${title}.xlsx`);
  };

  this.setTableThead = wb => {
    for (let key in wb) {
      let i = wb[key].v.indexOf('<key>');
      if (wb[key].v.includes('<key>')) {
        wb[key].v = wb[key].v.substr(0, i);
      }
    }
    return wb;
  };

  // 设置合并表头
  this.setTableMerges = (header, wb, hasTitle) => {
    let _merges = [];
    let len = header.length - 1;
    if (hasTitle) {
      let o = {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: len,
          r: 0
        }
      };
      _merges.push(o);
    }
    return [..._merges];
  };

  // 设置表头
  this.setMergeThead = (wb, merge, hasTitle, title) => {
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
    if (hasTitle) {
      wb['A1'] = {
        v: `${title}`,
        s: {
          border: borderAll,
          font: {
            sz: 18,
            bold: true
          },
          alignment: {
            horizontal: 'center'
          }
        }
      };
    }
    return wb;
  };

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
    return { border: borderAll };
  };

  this.save = (wb, fileName) => {
    let wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };
    let xw = XLSX.write(wb, wopts);
    let obj = new Blob([this.s2ab(xw)], {
      type: ''
    });
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

  // 根据val查询Object key
  this.findKey = (val, obj) => {
    return Object.keys(obj).find(v => obj[v] === val);
  };
}

const doit = new ExportsEXCL();

function downLoad() {
  doit.downLoad({
    header: header,
    body: data,
    hasTitle: true
  });
}
