/**
 * 前端table导出excel功能
 * herong 20181101 
 */

//equipUseRoom使用
function export_equipUseRoom($content,$title,$body,name){
	var table_all = $title.clone();
	//去掉空白第一行
	$(table_all.find('tr')[0]).remove();
	//去掉行中的第一列和最后一列
	$($(table_all.find('tr')[0]).find('th')[0]).remove();
	$($(table_all.find('tr')[0]).find('th')[$(table_all.find('tr')[0]).find('th').length-1]).remove();
	//去掉行中的第一列
	var table_contentAll = $body.clone();
	$(table_contentAll.find('tr')[0]).remove();
	
	var table_content = table_contentAll;
	table_all.find('tbody').append(table_content);
	table_all.removeClass();
	table_all.attr("class", "reportTable");
	table_all.css("display", "none");
	
	//删除每个tr中的第一列
	table_all.find('tbody').find('tr').each(function(index, elem) {
		if($(elem).children('th:first-child').length > 0) {
			$(elem).children('th:first-child').remove();
			$(elem).children('th:last-child').remove();
		} else if($(elem).children('td:first-child').length > 0) {
			$(elem).children('td:first-child').remove();
			$(elem).children('td:last-child').remove();
		}
	})
	$content.append(table_all);
//	console.log($('.reportTable')[0]);
	doit($('.reportTable')[0], name);
}
//studentStatistics使用   
function export_studentStatistics($content,$title,$body,name){
	
	var table_all = $title.clone();
	//表头 去掉空白第一行
	$(table_all.find('tr')[0]).remove();
	//表中 去掉行中的第一行
	var table_contentAll = $body.find('tbody').clone();
	$(table_contentAll.find('tr')[0]).remove();
	
	var table_content = table_contentAll;
	table_all.append(table_content);
	
	table_all.removeClass();
	table_all.attr("class", "reportTable");
	table_all.css("display", "none");
	
	$content.append(table_all);
//	console.log($('.reportTable')[0]);
	doit($('.reportTable')[0], name);
}
//supportStaff  使用
function export_supportStaff($content,$title,$body,name){
	
	var table_all = $title.clone();
	//表头 去掉空白第一行 第二行去掉前两列
	$(table_all.find('tr')[0]).remove();
	//表头  第二行去掉前两列
	$($(table_all.find('tr')[0]).find('th')[0]).remove();
	$($(table_all.find('tr')[0]).find('th')[0]).remove();
	//表中 去掉行中的第一行
	var table_contentAll = $body.find('tbody').clone();
	$(table_contentAll.find('tr')[0]).remove();
	
	var table_content = table_contentAll;
	table_all.append(table_content);
	table_all.removeClass();
	table_all.attr("class", "reportTable");
	table_all.css("display", "none");
	//删除每个tr中的第一列
	table_all.find('tbody').find('tr').each(function(index, elem) {
		if($(elem).children('th:first-child').length > 0) {
			$(elem).children('th:first-child').remove();
			$(elem).children('td:first-child').remove();
		} else if($(elem).children('td:first-child').length > 0) {
			$(elem).children('td:first-child').remove();
			$(elem).children('td:first-child').remove();
		}
	})
	$content.append(table_all);
//	console.log($('.reportTable')[0]);
	doit($('.reportTable')[0], name);
}
//  equipProfile同使用
function export_equipProfile($content,$title,$body,name){
	
	var table_all = $title.clone();
	//表头 去掉空白第一行
	$(table_all.find('tr')[0]).remove();
	//去掉行最后一列
	$($(table_all.find('tr')[0]).find('th')[$(table_all.find('tr')[0]).find('th').length-1]).remove();
	//表中 去掉行中的第一行
	var table_contentAll = $body.find('tbody').clone();
	$(table_contentAll.find('tr')[0]).remove();
	
	var table_content = table_contentAll;
	table_all.find('tbody').append(table_content.find('tr'));
	
	
	table_all.removeClass();
	table_all.attr("class", "reportTable");
	table_all.css("display", "none");
	//删除每个tr中的最后一列
	table_all.find('tbody').find('tr').each(function(index, elem) {
		
		$(elem).children('td:last-child').remove();
		
	})
	$content.append(table_all);
//	console.log($('.reportTable')[0]);
	doit($('.reportTable')[0], name);
}

/**
 * 
 * @param {Object} dom table的dom元素
 * @param {Object} name 导出的表名
 * @param {Object} type 导出的类型
 * @param {Object} fn 
 * @param {Object} dl
 */
function doit(dom, name,type, fn, dl) {
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
	saveAs(
		tmpDown,
		`${name}` +
			'.' +
			(wopts.bookType == 'biff2' ? 'xls' : wopts.bookType)
	);
	// return dl ?
	// STYLEXLSX.write(wb, {
	// 		bookType: type,
	// 		bookSST: true,
	// 		type: 'base64'
	// 	}) :
	// STYLEXLSX.writeFile(wb, fn || (name + '.' + (type || 'xlsx')));	
	
}

function saveAs(obj, fileName) {
	let tmpa = document.createElement('a');
	tmpa.download = fileName || '下载';
	tmpa.href = URL.createObjectURL(obj);
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
	
  var borderAll = {  //单元格外侧框线
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