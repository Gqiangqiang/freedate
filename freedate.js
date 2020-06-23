const fd = {
	/**
	 * 获取时间
	 * @param { (String | Date) } [par1]
	 * @param { (String | Date) } [par2]
	 */
	getDate:function(par1,par2){
		let fdate = new Date()			//新建Date
		let datestr = "YY-MM-DD hh:mm:ss" //初始化替换字符串

		if(par1 instanceof Date){ //判断两个参数的类型
			fdate = par1
			if(typeof(par2) === "string"){
				if(par2.trim() !== ""){
					datestr = par2
				}
			}
		} else if(typeof(par1) === "string"){
			if(par1.trim() !== ""){
				datestr = par1
			} 
			if(par2 instanceof Date){
				fdate = par2
			}
		}
		let weekE = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
		let WeekZH = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
		let Y = fdate.getFullYear()	//获取年
		let M = fdate.getMonth() + 1	//获取月 从0开始，所以得到的数值加1
		let D = fdate.getDate()		//获取日
		let h = fdate.getHours()		//获取小时
		let m = fdate.getMinutes()		//获取分
		let s = fdate.getSeconds()	//获取秒
		let week = fdate.getDay()		//获取星期【位置】
		let w = weekE[week]
		let W = WeekZH[week]
		//把要替换的字符和值放到对象中，之后遍历取出替换
		let STR = {"Y":Y,"M":M,"D":D,"h":h,"m":m,"s":s,"w":w,"W":W}

		/* 替换字符的函数 */
		function replaces(str, numbers) {
			if(str == "w" || str == "W") {
				if(exi(str)) datestr = datestr.replace(str, numbers)
			} else {
				if(exi(str)){
					if(exi(str + str)){
						datestr = datestr.replace(str + str, addZero(numbers))
					} else {
						if(str !== 'h'){
							datestr = datestr.replace(str, numbers)
						} else {
							datestr = datestr.replace(str, addZero(numbers) > 12 ? numbers - 12 : numbers)
						}
					}
				}
      }
		}
		//遍历替换字符
		for (const i in STR) {
			replaces(i, STR[i])
		}
		//判断字符是否存在于datestr中的函数
		function exi(strs) {
			return datestr.indexOf(strs) != -1
		}
		//对传进的值进行比对，如果小于10，则在其前面加入一个0；如输入3，返回结果为03。
		function addZero(data){
			if(data < 10){
				data = "0" + data
			}
			return data
		}
		return datestr
	},
	/**
	 * 获取时间戳函数 如果传入的是Date，则是由传入的日期转为timestamp
	 * @param {(number|Date)} [params]
	 */
	getTS:function(params){
		let fdate = new Date()			//新建Date
		let TS = fdate.valueOf()
		if(params !== undefined){
			if(typeof(params) === 'number'){
				TS += 86400000*params
			} else if(params instanceof Date){
				TS = params.valueOf()
			} else {
				throw new Error("The parameter must be of type 'number' or 'Date")
			}
		}
		return TS
	},
	/**
	 * 时间戳转date（支持直接转字符串）  其实就是调用了getDate()方法
	 * @param {number} ts - timestamp
	 * @param {string} [datestr] - 如果你想直接格式化，那么输入你想要的的格式，格式与getDate相同
	 */
	tsToDate:function(ts,datestr){
		let date
		if(ts !== undefined){
			if(typeof(ts) !== "number"){
				throw new Error("The parameter must be of type Numbers, you entered a "+typeof(ts)+" type.")
			}
			date = new Date(ts)
		} else {
			throw new Error('The parameter cannot be null')
		}
		if(datestr !== undefined){
			if(typeof(datestr) !== 'string'){
				throw new Error("The second parameter must be of type String")
			}
			date = this.getDate(datestr, date)
		}
		return date
	},
}

module.exports = fd //如果是在html中直接引用，可以把这行代码注释了，以免报错
