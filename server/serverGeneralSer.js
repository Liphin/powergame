/**
 * Created by Administrator on 2018/5/15.
 */
var url = require('url');
var util = require('util');
var request = require('request');
var serverSerData = require('./serverSerData');

function ServerGeneralSer() {

    var accessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";

    /**
     * 微信公众号非oath接口的access_token获取
     */
    this.getAccessToken = function (response, callback) {
        //非oath接口的access_token类型获取
        var type = 2;
        var current = new Date();

        //判断上次获取时间是否小于7000秒内
        if (current - serverSerData.instanceMapper[type]['timestamp'] < 7000000) {
            //直接获取cache中的access_token数据
            console.log('get cache access_token');
            callback();

        }else {
            //重新获取新的access_token数据
            console.log('get new access_token');
            var uri = util.format(accessTokenUrl, serverSerData.instanceMapper[type]['appid'], serverSerData.instanceMapper[type]['secret']);
            request.get(uri, function (err, res, body) {
                if (!err && res['statusCode'] == 200) {
                    var data= JSON.parse(body);
                    serverSerData.instanceMapper[type]['access_token'] = data['access_token']; //赋值access_token
                    serverSerData.instanceMapper[type]['timestamp'] = new Date(); //设置新的插入记录时间
                    callback();   //调用callback函数

                } else {
                    //调用出错
                    console.error("getAccessToken error: ", err);
                    if (response != null) {
                        response.send('error');
                    }
                }
            })
        }
    };


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