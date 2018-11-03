function exportsEXCL() {
    this.wopts = {
      bookType: 'xlsx',
      bookSST: true,
      type: 'binary',
      cellStyles: true
    };
  
    this.borderAll = {  //单元格外侧框线
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
  
    this.downloadExl = ({ header = {}, data = [], title = '导出数据', merges = undefined, hasTotal = true, type }) => {
      let _json = this.filerHeader(header, data, hasTotal);
      let _tmpdata = _json[1];
      _json.unshift({});
      let keyMap = []; //获取keys
      for (let k in _tmpdata) {
        keyMap.push(k);
        _json[1][k] = k;
      }
      let tmpdata = []; //用来保存转换好的json
      _json
        .map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign(
              {},
              {
                v: v[k],
                position:
                  (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +
                  (i + 1)
              }
            )
          )
        )
        .reduce((prev, next) => prev.concat(next))
        .forEach(
          (v, i) =>
            (tmpdata[v.position] = {
              v: v.v
            })
        );
      let outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
      this.setExlStyle(tmpdata);
      this.setExlMerges(header, tmpdata, merges);
      this.setHeaderStr(tmpdata);
      let tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, //内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
            }
          )
        }
      };   
  
      let tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type == undefined ? 'xlsx' : type,
                bookSST: false,
                type: 'binary'
              } //这里的数据是用来定义导出的格式类型
            )
          )
        ],
        {
          type: ''
        }
      );
      this.saveAs(
        tmpDown,
        `${title}` +
          '.' +
          (this.wopts.bookType == 'biff2' ? 'xls' : this.wopts.bookType)
      );
    };
  
    // 转换表头数据
    this.filerHeader = (header, data, hasTotal) => {
      if (hasTotal && data.total) {
        data.list.unshift(data.total);
      }
      let _data = data.list;
      let filterData = _data.reduce((arr, v) => {
        let o = {};
        for (let key in header) {
          let keys = Object.keys(v);
          if (keys.includes(key)) {
            o[`${header[key]}\&${key}`] = v[key];
          }
        }
        arr.push(o);
        return arr;
      }, []);
      filterData.unshift(header);
      return filterData;
    };
  
    // 去除表头空字符
    this.setHeaderStr = (data) => {
      for (let key in data) {
        if (data[key] instanceof Object) {
          if (data[key].v === undefined) {
            data[key].v = '';
          } else {
            let isStr = typeof (data[key].v) === 'string';
            if (isStr) {
              let hasIndex = (data[key].v).indexOf('&');
              if (hasIndex > -1) {
                data[key].v = (data[key].v).substr(0, hasIndex);
              }
              data[key].v = (data[key].v).replace('<br>', '');
            }
          }
        }
      } 
  
      let _mes = [];
      for (let val of data['!merges']) {
        if (val.s.key) {
          delete val.s.key;
        }
  
        if (val.s.c !== val.e.c) {
          _mes.push(val.e.c);
        }
  
      }
  
      for (let val of data['!merges']) {
        if (_mes.includes(val.s.c)) {
          let index = data['!merges'].findIndex(v => val.s.c === v.s.c);
          data['!merges'].splice(index, 1);
        }
      }
      return data;
    }
  
    // 设置样式
    this.setExlStyle = (data) => {   
      data['!cols'] = [];
      for (let key in data) {
        data[key].s = {
          border: this.borderAll
        }
        data['!cols'].push({wpx: 100});
      }
      return data;
    }
  
    // 合并单元格
    this.setExlMerges = (header, data, merges) => {
      let o = {};
      let _data = [];
      let keys = Object.keys(header);
      
      keys.forEach((key, i) => {
        o = {
          s: {
            c: i,
            r: 0,
            key: key
          },
          e: {
            c: i,
            r: 0
          }
        };
        _data.push(o);
      })
  
      data['!merges'] = _data.map(v => {
        if (merges) {
          for (let val of merges) {
            if (v.s.key === val.startColumnName) {
              v.e.c = (v.e.c + val.numberOfColumns - 1);
              let codeD = this.changeNum((v.s.c + 1));
              data[`${codeD}1`] = {
                t: "s",
                v: val.titleText
              }
            }
          }
          return v;
        } else {
          return v;
        }
      })    
      return data;
    }
  
    this.changeNum = (num) => {
      var stringName = "";
      if(num > 0) {
        if(num >= 1 && num <= 26) {
          stringName = String.fromCharCode(64 + parseInt(num));
        } else {
          while(num > 26) {
            var count = parseInt(num/26);
            var remainder = num%26;
            if(remainder == 0) {
              remainder = 26;
              count--;
              stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
            } else {
              stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
            }
            num = count;
          }
          stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
        }
        return stringName;
      }
    }
    // 保存文件
    this.saveAs = (obj, fileName) => {
      let tmpa = document.createElement('a');
      tmpa.download = fileName || '下载';
      tmpa.href = URL.createObjectURL(obj);
      tmpa.click();
      setTimeout(function() {
        URL.revokeObjectURL(obj);
      }, 100);
    };
  
    this.getCharCol = n => {
      let temCol = '',
        s = '',
        m = 0;
      while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
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
  
    // 获取表格表头
    this.getTableList = (elm) => {
      let colModelList = elm.jqGrid('getGridParam','colModel');
      let _arr = colModelList.reduce((arr, v) => {
        if (!v.hidden) {
          let key = v.name;
          let val = v.label;
          let o = {key, val};
          arr.push(o);
        }
        return arr;
      }, []);
      let _obj = {};
      for (let val of _arr) {
        _obj[val.key] = val.val;
      }
      return _obj;
    }
  }
  