/* eslint-disable */
/**
 * 为解决导出Excel文件时，导出文件没有样式 
 */
require('script-loader!file-saver');
import STYLEXLSX from 'xlsx-style';
import XLSX from 'xlsx';

/**
 * 前端导出Excel文件，利用页面DOM元素来导出文件，只能导出页面表格存在的数据，
 * 不能导出分页表格数据
 * 
 * @param {String} dom 表格ID或包含表格的ID
 * @param {String} name 导出文件的名称 默认值 导出数据
 * @param {Boolean} hasTitle 导出Excel文件表格是否有标题 默认值 true
 * @param {String} title 导出Excel文件表格标题 默认值 导出数据
 * @param {Boolean} isTotal 表格是否有合计行（如果表格头部含有合计行则不用配置） 默认值false
 * @param {String} type 导出文件的格式  默认值 xlsx
 * @param {Number} wpx Excel的宽列  默认值 60
 * @param {Object} cellWpx 表格自定义列宽  默认值 {0:{wpx: 120}}
 */
export class ExportExcelDom {
  init({
    dom,
    name = '导出数据',
    hasTitle = true,
    title,
    isTotal = false,
    type = 'xlsx',
    wpx = 60,
    cellWpx = {}
  }) {
    const privateDom = this.setTableDom(dom, hasTitle);
    this.download({
      dom: privateDom,
      name,
      isTotal,
      type,
      wpx,
      cellWpx,
      hasTitle,
      title
    });
  }

  // 表格DOM重新组装
  setTableDom(dom, hasTitle) {
    const cloneNode = dom.cloneNode(true);
    const exportNode = document.createElement('div').appendChild(cloneNode);
    exportNode.style = 'display: none';
    const checkBoxNode = exportNode.querySelectorAll(
      '.el-table-column--selection'
    );
    const displayNoneNode = exportNode.querySelectorAll(
      '[style*="display: none"]'
    );
    this.removeTableNode(checkBoxNode);
    this.removeTableNode(displayNoneNode);
    if (hasTitle) {
      this.createTableTitleNode(exportNode);
    }
    return exportNode;
  }

  createTableTitleNode(dom) {
    const existingDom = dom.getElementsByClassName(
      'el-table__header-wrapper'
    )[0];
    const trNode = document.createElement('tr');
    const thNode = document.createElement('th');
    const headTr = existingDom.querySelectorAll('tr')[0];
    const cells = headTr.cells;
    const colspan = this.getCellsLen(cells);
    thNode.setAttribute('colspan', colspan);
    trNode.appendChild(thNode);
    dom.insertBefore(trNode, existingDom);
  }

  getCellsLen(cells) {
    let len = 0;
    if (cells.length === 0) return;
    [].forEach.call(cells, function(cell) {
      len += cell.colSpan;
    });
    return len;
  }

  removeTableNode(nodes) {
    if (nodes.length === 0) return;
    [].forEach.call(nodes, function(node) {
      node.remove();
    });
  }

  // 表格数据转换Excel数据
  download({ dom, name, isTotal, type, wpx, cellWpx, hasTitle, title }) {
    // 表格数据
    const wb = XLSX.utils.table_to_book(dom, { sheet: `${name}`, raw: true });
    const _bookType = type;
    const _isTotal = isTotal;
    const _wpx = wpx;
    const wopts = {
      bookType: _bookType,
      bookSST: true,
      type: 'binary',
      cellStyles: true
    };

    const tableData = wb['Sheets'][`${name}`];

    // 设置样式
    this.setExlStyle(tableData, _isTotal, name, _wpx, cellWpx, hasTitle, title);

    const _wopts = {
      bookType: _bookType,
      bookSST: false,
      type: 'binary'
    };

    const styleWrite = STYLEXLSX.write(wb, _wopts);

    const s2ab = this.s2ab(styleWrite);

    let tmpDown = new Blob([s2ab], {
      type: ''
    });

    const _name = `${name}.${
      wopts.bookType == 'biff2' ? 'xls' : wopts.bookType
    }`;

    this.saveAs(tmpDown, _name);
  }
  // 设置表格样式
  setExlStyle(data, isTotal, name, wpx, cellWpx, hasTitle, title) {
    const borderAll = {
      //单元格外侧框线
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
      },
      diagonalDown: true
    };
    data['!cols'] = [];
    let totalText = []; // 合计数据
    for (let key in data) {
      if (data[key] instanceof Object) {
        data[key].s = {
          border: borderAll,
          alignment: {
            vertical: 'center', // 垂直居中
            horizontal: 'center', //水平居中对其
            wrapText: true // 自动换行
          }
        };
        data['!cols'].push({ wpx: wpx });

        if (data[key].v === '合计') {
          totalText.push(key);
        }
      }
    }

    for (let key in cellWpx) {
      let { wpx } = cellWpx[key];
      data['!cols'][key].wpx = wpx;
    }

    if (isTotal) {
      data['!merges'].push({
        s: { r: 3, c: 0 },
        e: { r: 3, c: 1 }
      });
    }
    // 报表头部标题样式
    if (hasTitle) {
      const privateTitle = title || name;
      if (!data[`A1`]) {
        data[`A1`] = { s: { font: {} }, v: privateTitle };
      } else {
        data[`A1`].v = privateTitle;
      }

      data[`A1`].s.font = {
        sz: 20,
        bold: true
      };
      data[`A1`].s.alignment = {
        vertical: 'center', // 垂直居中
        horizontal: 'center', //水平居中对其
        wrapText: false // 自动换行
      };
    }

    const deletionTh = this.getDeletionThKey(data);

    this.setDeletionThCell(data, deletionTh, borderAll);

    return data;
  }
  // 获取cell
  getDeletionThKey(data) {
    const nums = [];
    const letters = [];
    for (let key of Object.keys(data)) {
      if (data[key].toString() === '[object Object]') {
        let num = key.replace(/\D+/, '');
        let letter = key.replace(/\d+/, '');
        if (!nums.includes(num)) {
          nums.push(num);
        }
        if (!letters.includes(letter)) {
          letters.push(letter);
        }
      }
    }
    const deletionTh = letters.reduce((arr, v) => {
      for (let num of nums) {
        let o = `${v}${num}`;
        arr.push(o);
      }
      return arr;
    }, []);
    return deletionTh;
  }
  // 设置空cell
  setDeletionThCell(data, keys, borderAll) {
    for (let key of keys) {
      if (!data[key]) {
        data[key] = {
          s: {
            border: borderAll
          }
        };
      }
    }
  }
  // 导出文件
  saveAs(obj, fileName) {
    let tmpa = document.createElement('a');
    tmpa.download = fileName || '下载';
    tmpa.href = URL.createObjectURL(obj);
    // 兼容火狐
    document.body.appendChild(tmpa);
    tmpa.style.display = 'none';
    tmpa.click();
    setTimeout(function() {
      URL.revokeObjectURL(obj);
    }, 100);
  }
  
  // 转换数据
  s2ab(s) {    
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    } else {
      let buf = new Array(s.length);
      for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  }
}

/**
 * Json数据导出，并未实现合并表头类型导出.
 * 
 * @param {Array} header 表格头部 [{name: '名称'}, {address: '地址'}]
 * @param {Array} body 表格数据
 * @param {String} name 导出Excel文件名称 默认值 导出数据
 * @param {String} title 导出Excel文件表格标题
 * @param {Boolean} hasTitle 是否需要表格标题 默认值 true
 */
export class ExportExcelJson {
  init({ header = [], body = [], hasTitle = true, title = '导出数据', name = '导出数据' }) {
    this.downLoad({ header, body, title, hasTitle });
  }
  downLoad({ header, body, title, hasTitle, name }) {
    const styleCell = this.setBorderStyle();

    const _headers = header
      .map((v, i) => {
        let key = Object.keys(v);
        return Object.assign(
          {},
          {
            v: `${v[key[0]]}<key>${key[0]}`,
            position: String.fromCharCode(65 + i) + (hasTitle ? 2 : 1)
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
              position: String.fromCharCode(65 + j) + (i + (hasTitle ? 3 : 2))
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

    const _merges = this.setTableMerges(header, hasTitle);

    const _thead = this.setTableThead(mergeThead);

    const output = Object.assign({}, _thead, _body);

    const outputPos = Object.keys(output).sort();

    const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

    const types = _merges.length
      ? { '!ref': ref, '!merges': _merges }
      : { '!ref': ref };

    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign({}, output, types)
      }
    };

    const borderAll = {
      //单元格外侧框线
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
      },
      diagonalDown: true
    };

    const sheetKeys = this.getDeletionThKey(wb.Sheets.mySheet);

    this.setDeletionThCell(wb.Sheets.mySheet, sheetKeys, borderAll);

    this.save(wb, `${name}.xlsx`);
  }

  // 获取cell
  getDeletionThKey(data) {
    const nums = [];
    const letters = [];
    for (let key of Object.keys(data)) {      
      if (key !== '!merges' && data[key].toString() === '[object Object]') {
        let num = key.replace(/\D+/, '');
        let letter = key.replace(/\d+/, '');
        if (!nums.includes(num)) {
          nums.push(num);
        }
        if (!letters.includes(letter)) {
          letters.push(letter);
        }
      }
    }
    const deletionTh = letters.reduce((arr, v) => {
      for (let num of nums) {
        let o = `${v}${num}`;
        arr.push(o);
      }
      return arr;
    }, []);
    return deletionTh;
  }

  // 设置空cell
  setDeletionThCell(data, keys, borderAll) {
    for (let key of keys) {
      if (!data[key]) {
        data[key] = {
          s: {
            border: borderAll
          }
        };
      }
    }
  }

  setTableThead(wb) {
    for (let key in wb) {
      let i = wb[key].v.indexOf('<key>');
      if (wb[key].v.includes('<key>')) {
        wb[key].v = wb[key].v.substr(0, i);
      }
    }
    return wb;
  }

  // 设置合并表头
  setTableMerges(header, hasTitle) {
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
  }

  // 设置表头
  setMergeThead(wb, hasTitle, title) {
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
            vertical: 'center', // 垂直居中
            horizontal: 'center', //水平居中对其
            wrapText: true // 自动换行
          }
        }
      };
    }
    return wb;
  }

  setBorderStyle() {
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
  }

  save(wb, fileName) {
    let wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };
    let xw = STYLEXLSX.write(wb, wopts);
    let obj = new Blob([this.s2ab(xw)], {
      type: ''
    });
    let elem = document.createElement('a');
    elem.download = fileName || '下载';
    elem.href = URL.createObjectURL(obj);
    // 兼容火狐
    document.body.appendChild(elem);
    elem.click();
    setTimeout(function() {
      URL.revokeObjectURL(obj);
    }, 100);
  }

  s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    } else {
      let buf = new Array(s.length);
      for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  }
}
