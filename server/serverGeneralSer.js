/**
 * Created by Administrator on 2018/5/15.
 */

function ServerGeneralSer() {

    /**
     * 设置异源访问策略
     * @param req
     * @param res
     * @param next
     */
    // this.setCrossOrigin=function (req, res, next) {
    //     // Website you wish to allow to connect
    //     res.setHeader('Access-Control-Allow-Origin', dataHelper.crossOrigin['origin']);
    //     // Request methods you wish to allow
    //     res.setHeader('Access-Control-Allow-Methods', dataHelper.crossOrigin['methods']);
    //     // Request headers you wish to allow
    //     res.setHeader('Access-Control-Allow-Headers', dataHelper.crossOrigin['headers']);
    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     res.setHeader('Access-Control-Allow-Credentials', dataHelper.crossOrigin['credentials']);
    //     // Pass to next layer of middleware
    //     next();
    // };

    /**
     * 公用实用方法，统一判空检测
     * @param data
     * @returns {boolean}
     */
    this.checkDataNotEmpty = function (data) {
        var status = false;
        if (data != null && data != undefined) {
            //根据变量的不同类型进行判空处理
            switch (Object.prototype.toString.call(data)) {
                /*String类型数据*/
                case '[object String]': {
                    if (data.trim() != '') {
                        status = true;
                    }
                    break;
                }
                /*Array类型*/
                case '[object Array]': {
                    if (data.length > 0) {
                        status = true;
                    }
                    break;
                }
                /*Object类型*/
                case '[object Object]': {
                    if (Object.keys(data).length > 0) {
                        status = true;
                    }
                    break;
                }
                /*其他类型状态默认设置为true，分别为Number和Boolean类型*/
                default: {
                    status = true;
                    break;
                }
            }
        }
        return status;
    };


    /**
     * 返回当前日期，格式为2018-01-01
     */
    this.getDateTime = function () {
        var date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + date.getHours() + ":" +
            date.getMinutes() + ":" + date.getSeconds();
    };

    /**
     * 获取时间戳函数
     * @returns {string}
     */
    this.getTimestamp = function () {
        return new Date().getTime().toString();
    };

    /**
     * 获取字符串
     * @returns {string}
     */
    this.getRandomStr = function () {
        return Math.random().toString(36).substring(7);
    }
}

module.exports = ServerGeneralSer;