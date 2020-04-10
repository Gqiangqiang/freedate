var fdate = new Date();			//新建Date全局变量
var fd = {
	/**
	 * get formatting time
	 * @param {string} timestr 
	 * @param {Date} newDate 
	 */
	getTime:function(timestr,newDate){
		if(typeof(timestr) !== "string"){
			throw new Error("The first parameter must be of type 'string'");
		}
		if(newDate !== undefined){
			if(newDate instanceof Date){
				fdate = newDate;
			} else {
				throw new Error("The second parameter must be of type 'Date'");
			}
		}
		var datestr = timestr;			//赋值给内部变量以便进行操作
		var Y = fdate.getFullYear();	//获取年
		var M = fdate.getMonth() + 1;	//获取月 从0开始，所以得到的数值加1
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
		//年 Year
		if(datestr.indexOf("Y") != -1){
			datestr = datestr.replace("Y", Y);
		}
		//月 Month
		if(datestr.indexOf("M") != -1){
			if(datestr.indexOf("MM") != -1){
				datestr = datestr.replace("MM", addZero(M));
			} else {
				datestr = datestr.replace("M", M);
			}
		}
		//日 day
		if(datestr.indexOf("D") != -1){
			if(datestr.indexOf("DD") != -1){
				datestr = datestr.replace("DD", addZero(D));
			} else {
				datestr = datestr.replace("D", D);
			}
		}
		//周、星期 week
		if(datestr.indexOf("w") != -1){
			datestr = datestr.replace("w", w);
		}
		if(datestr.indexOf("W") != -1){
			datestr = datestr.replace("W",W);
		}
		//时 Hours
		if(datestr.indexOf("h") != -1){
			if(datestr.indexOf("hh") != -1){
				datestr = datestr.replace("hh", addZero(h));
			} else {
				datestr = datestr.replace("h", addZero(h) > 12 ? h - 12 : h);
			}
		}
		//分 minute
		if(datestr.indexOf("m") != -1){
			if(datestr.indexOf("mm") != -1){
				datestr = datestr.replace("mm", addZero(m));
			} else {
				datestr = datestr.replace("m", m);
			}
		}
		//秒 second
		if(datestr.indexOf("s") != -1){
			if(datestr.indexOf("ss") != -1){
				datestr = datestr.replace("ss", addZero(s));
			} else {
				datestr = datestr.replace("s", s);
			}
		}
		//对传进的值进行比对，如果小于10，则在其前面加入一个0；如输入3，返回结果为03。
		function addZero(data){
			if(data < 10){
				data = "0" + data;
			}
			return data;
		}
		return datestr;
	},
	/**
	 * get timestamp
	 * 获取时间戳函数
	 * @param {number} offset
	 */
	getTS:function(offset){
		var TS = fdate.valueOf();
		if(offset !== undefined){
			if(typeof(offset) !== 'number'){
				throw new Error("The parameter must be of type 'number'");
			}
			TS += 86400000*offset;
			
		}
		return TS;
	},
	/**
	 * timestamp to date
	 * @param {number} ts // timestamp
	 * @param {string} datestr
	 */
	tsToDate:function(ts,datestr){
		let date;
		if(ts !== undefined){
			if(typeof(ts) !== "number"){
				throw new Error("The parameter must be of type Numbers, you entered a "+typeof(ts)+" type.");
			}
			date = new Date(ts);
		} else {
			throw new Error('The parameter cannot be null');
		}
		if(datestr !== undefined){
			if(typeof(datestr) !== 'string'){
				throw new Error("The second parameter must be of type String");
			}
			date = this.getTime(datestr, date);
		}
		return date;
	}
}
module.exports = fd;