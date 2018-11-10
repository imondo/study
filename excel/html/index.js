function doit() {
  var elt = document.getElementById('tableBox'); 
  
  exportExl(elt);
}

/**
 * 
 * @param {Object} dom table的dom元素
 * @param {Object} name 导出的表名
 * @param {Object} type 导出的类型
 * 
 */
function exportExl(dom, name = '导出数据', type) {
	var wb = XLSX.utils.table_to_book(dom, {sheet: "Sheet JS"});
	var wopts = {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
    cellStyles: true
	};

	setExlStyle(wb['Sheets']['Sheet JS']);
	
	let tmpDown = new Blob(
		[
			this.s2ab(
				STYLEXLSX.write(
					wb,
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
	console.log(tmpDown)
	saveAs(
		tmpDown,
		`${name}` +
			'.' +
			(wopts.bookType == 'biff2' ? 'xls' : wopts.bookType)
	);	
}

function saveAs(obj, fileName) {
	let tmpa = document.createElement('a');
	tmpa.download = fileName || '下载';
	console.log(URL.createObjectURL)
	tmpa.href = URL.createObjectURL(obj);
	// 兼容火狐
	document.body.appendChild(tmpa);
	tmpa.style.display='none';
	tmpa.click();
	setTimeout(function() {
		URL.revokeObjectURL(obj);
	}, 100);
}	


function s2ab (s){
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

function setExlStyle (data) {  
	
  let borderAll = {  //单元格外侧框线
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
					horizontal: 'center'   //水平居中对其
				},
				numFmt: 0
			}
			data['!cols'].push({wpx: 170});
		}
	}
	return data;
}