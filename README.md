# freedate
    让你更自由的获取时间并组合成自己想要的格式

    Make you more free to get time and combine it into the format you want

# 使用方法(How to use)
```js
现在的默认格式为(default format)：
    var fd = require('freedate');
    var date = fd.getTime();
    console.log(date); //2020/01/04 15:21:37
```
## 更多(more)
```js 
如(for example)：
    fd.getTime("Y-M-D") ==> '2020-1-4'

    fd.getTime("M DD") ==> '1 04'

    fd.getTime("h:m:s") ==> '3:23:33'
    
    fd.getTime("Y/M/D h:m:s") ==> '2020/1/4 3:23:33'

    fd.getTime("Y/MM/DD W hh:mm:ss") ==> '2020/01/04 Thur 15:23:33'

    fd.getTime("Y/MM/DD w hh:mm:ss") ==> '2020/01/04 星期四 15:23:33'

    fd.getTime("Y年 MM月 DD日 w hh:mm:ss") ==> '2020年 01月 04日 星期四 15:23:33'

    fd.getTime("现在是：Y年MM月DD日 w 下午 hh点mm分") ==> '现在是：2020年01月04日 星期四 下午 15点23分'

    fd.getTime("MM/DD/Y hh:mm:ss") ==> '1/4/2020 03:23:33'
    
    //把已有的其他时间格式化
    fd.getTime("Y/MM/DD hh:mm:ss W",fd.tsToDate(fd.getTS(10))) ==> "2020/04/20 14:43:05 Mon" //'otherDate' must be type of Date
    // get the timestamp
    fd.getTS() ==> 1586491413246   //现在 Now
    fd.getTS(-1) ==> 1586405054923 //一天前 A day earlier
    fd.getTS(1) ==> 1586577868836 //一天后 After a day
    
    // timestamp to date
    fd.tsToDate(1586491413246) ==> '2020-04-10T04:03:33.246Z'
    fd.tsToDate(1586491413246,"Y/MM/DD hh:mm:ss W") ==> '2020/04/10 12:03:33 Fri'
```
    如果有两个“D”，那么当数字小于10的时候，有零在这个数字前面，就像“01”或者“02”;如果只有一个“D”的话，就没有这个0。使用过程中可以混合使用。

    If there are two "D", then when the number is less than 10, there is zero in front of the number, such as "01" or "02"; if there is only one "D", there is no zero. Can be mixed during use.


# getTime参数对照表(Comparison table)
| code | return | for example |
|:-:|:-:|:-:|
|  Y  |  返回年(`year`) | 2018,2019,2020...
|  M  |  返回月(`month`)，没有前置0 | 1~12
|  MM |  返回月(`month`)，有前置的0 | 01~12
|  D  |  返回日(`day`)，没有前置0 | 1~31
|  DD |  返回日(`day`)，有前置的0 | 01~31
|  h  |  返回小时(`hours`)，12小时制 | 	01~12
|  hh |  返回小时(`hours`)，24小时制 | 	01~24
|  m  |  返回分钟(`minute`)，没有前置0 | 1~60
|  mm |  返回分钟(`minute`)，有前置的0 | 01~60
|  s  |  返回秒(`second`)，没有前置0 | 	1~60
|  ss |  返回秒(`second`)，有前置的0 | 	01~60
|  w  |  返回星期(`week` Chinese)，值为:星期X | 星期一~星期日
|  W  |  返回星期(`week` English)， | Sun/Mon/Tue/Wed/Thur/Fri/Sat
|  TS | 返回时间戳(`time stamp`) | 1578121532

# 方法（methods）
- **getTime(timestr, newDate)**
    - `timestr` 类型必须是`String`，可以为空(The type must be a `string` and ***can be null***)  
    - `newDate` 类型必须是`Date`，可以为空(The type must be a `Date` and ***can be null***)  

- **getTS(offset)**  
    -  `offset` 必须是`number`类型,可以为空,可以为负值（负值就是几天前，正值就是几天后），如果为空获取的是当前时间的时间戳,(The type must be a `number` and ***can be null***. It can be negative if it is null to get the timestamp of the current time)  

- **tsToDate(ts,datestr)**
    - `ts` 必须是`number`类型，不能为空(The type must be a `number` and ***cannot be null***)
    - `datestr` 必须是`String`类型，可以为空(The type must be a `string` and ***can be null***)

## 注意(Attention)
**`When word splicing is needed, freedate is not very friendly to English users`**

`fd`函数中会把在字符串中出现的第一个符合条件的字符替换为时间，且再次出现的字符不会再被替换。
```js
    fd.getTime("M M M") ==> 4 M M。
```
以M为例，MM的优先级比M要高，所以如果输入的字符串中有M也有MM那么被替换的会是MM。
```js
    fd.getTime("M-MM-MM") ==> M-04-MM。
```
The `fd` function will replace the first eligible character in the string with the time, and the character that appears again will not be replaced.
```js
    fd.getTime("M M M") ==> 4 M M。
``` 
For example, the priority of MM is higher than that of M, so if there is also MM in the input string, MM will be replaced.
```js
    fd.getTime("M-MM-MM") ==> M-04-MM。
```

# 版本(Version)
***`If necessary, please translate by yourself,thanks for your understanding.`***
**V1.0.4**
- 修复getTS()时间获取问题
**V1.0.3**
- 修复获取时间的时不传入值出错的问题

**V1.0.2**
- 修改了时间的获取方式：引入后通过`fd.getTime()`的方式来使用方法
- 增加`getTS()`来获取时间戳,移除了通过`getTime("TS")`来获取时间戳的方式，可以输入参数“天”
- 增加`tsToDate()`来把`timestamp`转换为`Date`

**V1.0.1**
- 增加了使用字符串"TS"来获取时间戳。(Added the use of the string "TS" to get the timestamp.)