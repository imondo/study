/* eslint-disable */
/**
 * 前端导出Excel文件
 * @param {String} dom 表格ID或包含表格的ID 
 * @param {String} name 表格导出的名称
 * @param {Boolean} isTotal 表格是否有合计行（如果表格头部含有合计行则不用配置） 默认值false
 * @param {String} type 导出文件的格式  默认值 xlsx
 * @param {Number} wpx Excel的宽列  默认值 60
 * @param {Object} cellWpx 表格自定义列宽  默认值 {0:{wpx: 120}}
 */
require('script-loader!file-saver');
import STYLEXLSX from 'xlsx-style';
import XLSX from 'xlsx';

class ExportExcel {
  init({dom, name = '导出数据', isTotal = false, type = 'xlsx', wpx = 60, cellWpx = {}}) {
    const privateDom = this.setTableDom(dom);
    this.download({dom: privateDom, name, isTotal, type, wpx, cellWpx});
  }

  // 表格DOM重新组装
  setTableDom(dom) {
    const cloneNode = dom.cloneNode(true);
    const exportNode = document.createElement('div').appendChild(cloneNode);
    exportNode.style = 'display: none';
    const checkBoxNode = exportNode.querySelectorAll('.el-table-column--selection');
    const displayNoneNode = exportNode.querySelectorAll('[style*="display: none"]');
    this.removeNode(checkBoxNode);
    this.removeNode(displayNoneNode);
    return exportNode;
  }

  removeNode(nodes) {
    if (nodes.length === 0) return;
    [].forEach.call(nodes, function(node){　
      node.remove();
    });
  }

  // 表格数据转换Excel数据
  download({dom, name, isTotal, type, wpx, cellWpx}) {
    // 表格数据
    const wb = XLSX.utils.table_to_book(dom, { sheet: `${name}`, raw: true });
    console.log(wb);
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
    this.setExlStyle(tableData, _isTotal, name, _wpx, cellWpx);

    const _wopts = {
      bookType: _bookType,
      bookSST: false,
      type: 'binary'
    };

    const styleWrite = STYLEXLSX.write(wb, _wopts);

    const s2ab = this.s2ab(styleWrite);

    let tmpDown = new Blob(
      [
        s2ab
      ],
      {
        type: ''
      }
    );

    const _name = `${name}.${(wopts.bookType == 'biff2' ? 'xls' : wopts.bookType)}`;
    
    this.saveAs(tmpDown, _name);
  }
  // 设置表格样式
  setExlStyle(data, isTotal, name, wpx, cellWpx) {
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

    // 报表头部样式
    if (!data[`A1`]) {
      data[`A1`] = { s: { font: {} }, v: name };
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

    const deletionTh = this.getDeletionThKey(data);

    this.setDeletionThCell(data, deletionTh, borderAll);

    return data;
  }
  // 获取cell
  getDeletionThKey(data) {
    const nums = [];
    const letters = [];
    for (let key of Object.keys(data)) {
      if ((data[key].toString() === '[object Object]')) {
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
        }
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
    tmpa.style.display='none';
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

export default ExportExcel;