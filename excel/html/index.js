function doit(type, fn, dl) {
	var elt = document.getElementById('tableBox');
  var wb = XLSX.utils.table_to_book(elt); // , {sheet:"Sheet JS"}
  console.log(wb);
  wb.Sheets.Sheet1.A1.s = { fill: {patternType: "none",fgColor: {rgb: "FF000000"},bgColor: {rgb: "00000000"}} }
  
	return dl ?
  XLSXStyle.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
  XLSXStyle.writeFile(wb, fn || ('test.' + (type || 'xlsx')));
}