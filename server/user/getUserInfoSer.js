/**
 * Created by Administrator on 2018/9/20.
 */
var url = require('url');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var serverSerData = require('../serverSerData');
var ServerGeneralSer = require('../serverGeneralSer');
var UserGeneralSer = require('./userGeneralSer');

var userGeneralSer = new UserGeneralSer();
var serverGeneralSer = new ServerGeneralSer();


function GetUserInfoSer() {

    //获取微信企业code的api
    //var getUserCodeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=1#wechat_redirec";
    //var getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s";


    // /**
    //  * 获取用户的基础数据
    //  * @param type
    //  * @param code
    //  * @param res
    //  * @param callback
    //  */
    // var getUserInfo = function (type, res, callback) {
    //     //拼接获取用户数据的请求链接
    //     var acesstoken=serverSerData.instanceMapper[type]['access_token'];
    //     var openid=serverSerData.userWxInfo['openid'];
    //     var uri = util.format(getUserInfoUrl, acesstoken, openid);
    //     //用https方式请求
    //     https.get(uri, function (res) {
    //         res.setEncoding('utf8');
    //         res.on('data', function (data) {
    //             var userData = JSON.parse(data);
    //             // console.log('get userData1', userData)
    //             callback(userData);
    //         });
    //
    //     }).on('error', function (e) {
    //         console.error("Get error: ", e);
    //         res.send('error');
    //     });
    // };


    // /**
    //  * 获取公司员工信息数据
    //  * @param req
    //  * @param res
    //  */
    // this.getWxUserInfo = function (req, res) {
    //
    //     //解析url参数
    //     var type=1;
    //     var arg = url.parse(req.url, true).query;
    //     var code = arg['code'];
    //
    //     //赋值code
    //     serverSerData.instanceMapper[type]['code'] = code;
    //     console.log(code);
    //
    //     //获取access_token
    //     userGeneralSer.getAccessToken(type, res, function () {
    //
    //         //获取用户user数据
    //         console.log(serverSerData.instanceMapper[type]['access_token']);
    //         console.log(serverSerData.userWxInfo['openid']);
    //         getUserInfo(type, res, function (userData) {
    //             if(serverGeneralSer.checkDataNotEmpty(userData)){
    //                 // console.log('user data',userData);
    //                 res.send(userData);
    //             }
    //             else{
    //                 //获取用户失败
    //                 res.send('400');
    //             }
    //         })
    //     })
    // };
    this.getWxUserInfo = function (req, res) {

        var type=1;
        var arg = url.parse(req.url, true).query;
        var code = arg['code'];
        var appid = serverSerData.instanceMapper[type]['appid'];
        var secret = serverSerData.instanceMapper[type]['secret'];

        var getAccessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";

        var uri = util.format(getAccessTokenUrl, appid, secret,code);
        //用request方式请求
        request.get(uri, function (err, resData, body) {
            if (!err && resData['statusCode'] == 200) {
                var userinfo= JSON.parse(body);
                console.log(userinfo);
                res.send(userinfo);

            } else {
                //调用出错
                console.error("getAccessToken error: ", err);
                if (res != null) {
                    res.send('error');
                }
            }
        });
    }


}

module.exports = GetUserInfoSer;