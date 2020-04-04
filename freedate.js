/*	如： Y/M/D h:m:s 		==> 2020/1/4 03:23:33
		 Y/MM/DD w hh:mm:ss ==> 2020/01/04 星期四 15:23:33
		 Y/MM/DD 			==> 2020/01/04
*/
function fd(timestr){
	var datestr = timestr;			//赋值给内部变量以便进行操作
	var fdate = new Date();			//新建Date对象
	var TS = fdate.valueOf();		//获取时间戳
	var Y = fdate.getFullYear();	//获取年
	var M =fdate.getMonth() + 1;	//获取月 从0开始，所以得到的数值加1
	var D = fdate.getDate();		//获取日
	var h = fdate.getHours();		//获取小时
	var m = fdate.getMinutes();		//获取分
	var s = fdate.getSeconds();		//获取秒
	var w = fdate.getDay();			//获取星期
	var W;
	switch (w) {
		case 1:
			w = '星期一';
			W = 'Mon';
			break;
		case 2:
			w = '星期二';
			W = 'Tue';
			break;
		case 3:
			w = '星期三';
			W = 'Wed';
			break;
		case 4:
			w = '星期四';
			W = 'Thur';
			break;
		case 5:
			w = '星期五';
			W = 'Fri';
			break;
		case 6:
			w = '星期六';
			W = 'Sat';
			break;
		case 0:
			w = '星期日';
			W = 'Sun';
			break;
		default:
			w = '星期获取出错';
			W = 'Error';
			break;
	}
	if(datestr == "" || datestr == undefined){
		datestr = "Y/MM/DD hh:mm:ss";
	}
	if(datestr.indexOf("Y") != -1){
		datestr = datestr.replace("Y", Y);
	}
	if(datestr.indexOf("M") != -1){
		if(datestr.indexOf("MM") != -1){
			datestr = datestr.replace("MM", addZero(M));
		} else {
			datestr = datestr.replace("M", M);
		}
	}
	if(datestr.indexOf("D") != -1){
		if(datestr.indexOf("DD") != -1){
			datestr = datestr.replace("DD", addZero(D));
		} else {
			datestr = datestr.replace("D", D);
		}
	}
	if(datestr.indexOf("w") != -1){
		datestr = datestr.replace("w", w);
	}
	if(datestr.indexOf("W") != -1){
		datestr = datestr.replace("W",W);
	}
	if(datestr.indexOf("h") != -1){
		if(datestr.indexOf("hh") != -1){
			datestr = datestr.replace("hh", addZero(h));
		} else {
			datestr = datestr.replace("h", addZero(h) > 12 ? h - 12 : h);
		}
	}
	if(datestr.indexOf("m") != -1){
		if(datestr.indexOf("mm") != -1){
			datestr = datestr.replace("mm", addZero(m));
		} else {
			datestr = datestr.replace("m", m);
		}
	}
	if(datestr.indexOf("s") != -1){
		if(datestr.indexOf("ss") != -1){
			datestr = datestr.replace("ss", addZero(s));
		} else {
			datestr = datestr.replace("s", s);
		}
	}
	if(datestr.indexOf("TS" != -1)){
		datestr = datestr.replace("TS",TS);
	}
	//对传进的值进行比对，如果小于10，则在其前面加入一个0；如输入3，返回结果为03。
	function addZero(data){
		if(data < 10){
			data = "0" + data;
		}
		return data;
	}
	return datestr;
}
module.exports = fd;