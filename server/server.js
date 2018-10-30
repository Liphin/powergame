/**
 * Created by Administrator on 2017/2/21.
 */
//获取目标environment，若无则默认赋值global变量为dev
global.env = process.env.TARGET_ENV;
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}
var url = require('url');
var http = require('http');
var request = require('request');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var device = require('express-device');
//var schedule = require('node-schedule');
var serverSerData = require('./serverSerData');
var ServerSer = require('./serverSer');
var GetUserInfoSer = require('./user/getUserInfoSer');


/*设置全局变量*/
var app = express();
var serverSer = new ServerSer();
var PORT = serverSerData.port;
var getUserInfoSer = new GetUserInfoSer();


//设置http请求接收数据最大限额
app.use(device.capture());
app.use(bodyParser.json({limit: serverSerData.httpDataLimit}));
app.use(bodyParser.urlencoded({limit: serverSerData.httpDataLimit, extended: true}));
app.use(serverSer.setCrossOrigin);


/**
 * 获取企业微信里成员详细信
 */
app.get('/getWxUserInfo', function (req, res) {
    getUserInfoSer.getWxUserInfo(req, res);
});


//资源文件获取
app.use('/userinfo', express.static(serverSerData.basePath + '/userinfo'));
app.use('/favicon.ico', express.static(serverSerData.projectPath + '/public/favicon.png'));
app.use('/assets', express.static(serverSerData.projectPath + '/assets'));

//默认主页
app.get('/', function (req, res) {
    res.sendFile(serverSerData.projectPath + "/public/index.html");
});
//加载资源
app.get('/*', function (req, res) {
    var pathName = serverSerData.projectPath + "/public/" + url.parse(req.url).pathname;
    res.sendFile(pathName, '', function (err) {
        //如果加载不到路由文件，则默认返回index.html初始化加载数据
        if (err) {
            res.sendFile(serverSerData.projectPath + "/public/index.html");
        }
    });
});

app.listen(PORT);
console.log("Server is running at port: " + PORT + " , and at environment: " + global.env);

