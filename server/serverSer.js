/**
 * Created by Administrator on 2018/5/15.
 */
//var schedule = require('node-schedule');
var serverSerData = require('./serverSerData');

function ServerSer() {

    /**
     * 设置异源访问策略
     * @param req
     * @param res
     * @param next
     */
    this.setCrossOrigin=function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    };



}

module.exports = ServerSer;