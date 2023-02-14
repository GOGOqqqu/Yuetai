
// 日期 
function DateTime() {
	let data = new Date()
	//月份
	let month = data.getMonth() + 1
	//几号
	let dates = data.getDate()
	let yue = month > 10 ? month : '0' + month
	let ri = dates > 10 ? dates : '0' + dates
	let date = yue + '月' + ri + '日'
	return date
}
function GetDate(el) {
	let timestamp4 = new Date(el);
	//直接用 new Date(时间戳) 格式转化获得当前时间
	
	//getFullYear(): 获取年份, 0 - 11
	let year = timestamp4.getFullYear();
	
	//getMonth(): 获取月份, 0 - 11
	let month = timestamp4.getMonth() + 1;
	let months= month > 10 ? month : '0' + month
	//getDate(): 获取日份
	let ri = timestamp4.getDate();
	let ris = ri < 10 ? "0" + ri : ri;
	
	let time = year + '年' + months + '月' + ris + '日'
	return time
}

module.exports = {
	DateTime,
	GetDate
}