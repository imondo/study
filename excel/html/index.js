function doit() {
  const elem = document.getElementById('tableBox');
	const exportExl = new ExportExl();
	exportExl.init(elem)
}

/**
 *
 * @param {Object} dom table的dom元素
 * @param {Object} name 导出的表名
 * @param {Object} type 导出的类型
 *
 */
const ExportExl = function() {
  this.init = (dom, name = '导出数据', type) => {
    let wb = XLSX.utils.table_to_book(dom, { sheet: 'Sheet JS' });
    const wopts = {
      bookType: 'xlsx',
      bookSST: true,
      type: 'binary',
      cellStyles: true
    };
    this.setExlStyle(wb['Sheets']['Sheet JS']);
    const _type = {
      bookType: type == undefined ? 'xlsx' : type,
      bookSST: false,
      type: 'binary'
    };
    const sw = STYLEXLSX.write(wb, _type);
    const s2ab = this.s2ab(sw);
    let tmpDown = new Blob([s2ab], {
      type: ''
    });
    console.log(tmpDown);
    const bookType = `${name}.${
      wopts.bookType == 'biff2' ? 'xls' : wopts.bookType
    }`;
    this.saveAs(tmpDown, bookType);
  };

  this.setExlStyle = data => {
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
      }
    };
    data['!cols'] = [];
    for (let key in data) {
      if (data[key] instanceof Object) {
        data[key].s = {
          border: borderAll,
          alignment: {
            horizontal: 'center' //水平居中对其
          },
          numFmt: 0
        };
        data['!cols'].push({ wpx: 170 });
      }
    }
    return data;
  };

  this.saveAs = (obj, fileName) => {
    let tmpa = document.createElement('a');
    tmpa.download = fileName || '下载';
    console.log(URL.createObjectURL);
    tmpa.href = URL.createObjectURL(obj);
    // 兼容火狐
    document.body.appendChild(tmpa);
    tmpa.style.display = 'none';
    tmpa.click();
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
};
