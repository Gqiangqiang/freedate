var fd = {
	/**
	 * get formatting time
	 * @param { string } [timestr] 
	 * @param { Date } [otherDate]
	 */
	getDate:function(timestr,otherDate){
		var fdate = new Date();			//新建Date
		if(timestr !== undefined && typeof(timestr) !== "string"){
			throw new Error("The first parameter must be of type 'string'");
		}
		if(otherDate !== undefined){
			if(otherDate instanceof Date){
				fdate = otherDate;
			} else {
				throw new Error("The second parameter must be of type 'Date'");
			}
		}
		var weekE = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
		var WeekZH = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var datestr = timestr;			//赋值给内部变量以便进行操作
		var Y = fdate.getFullYear();	//获取年
		var M = fdate.getMonth() + 1;	//获取月 从0开始，所以得到的数值加1
		var D = fdate.getDate();		//获取日
		var h = fdate.getHours();		//获取小时
		var m = fdate.getMinutes();		//获取分
		var s = fdate.getSeconds();		//获取秒
		var week = fdate.getDay();		//获取星期【位置】
		var w = weekE[week];
		var W = WeekZH[week];
		
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
	 * 获取时间戳函数 如果传入的是Date，则是由传入的日期转为timestamp
	 * @param {(number|Date)} [params]
	 */
	getTS:function(params){
		var fdate = new Date();			//新建Date
		var TS = fdate.valueOf();
		if(params !== undefined){
			if(typeof(params) === 'number'){
				// console.log("The type is Number");
				TS += 86400000*params;
			} else if(params instanceof Date){
				// console.log("The type is Date");
				TS = params.valueOf();
			} else {
				throw new Error("The parameter must be of type 'number' or 'Date");
			}
			
		}
		return TS;
	},
	/**
	 * timestamp to date
	 * @param {number} ts - timestamp
	 * @param {string} [datestr] - 如果你想直接格式化，那么输入你想要的的格式，格式与getDate相同
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
			date = this.getDate(datestr, date);
		}
		return date;
	},
}
module.exports = fd;