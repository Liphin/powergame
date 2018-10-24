/**
 * Created by Administrator on 2018/8/20.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallGeneralSer', function (OverallDataSer, $timeout, $rootScope, $cookies, $location) {

    /**
     * 对数据进行判空处理
     * @param data
     */
    var checkDataNotEmpty = function (data) {
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
     * 对每个sql key word进行监测是否在content中出现，
     * 若出现则返回false验证，否则返回true通过
     * @param content
     */
    var sqlInjectFilter = function (content) {
        //循环每个sql key word进行监测
        for (var i in OverallDataSer.sqlVerify) {
            if (String(content).indexOf(OverallDataSer.sqlVerify[i]) >= 0) {
                return false;
            }
        }
        return true;
    };


    /**
     * 返回当前时间的timestamp
     * 若有前缀则添加前缀，否则直接返回时间戳数据
     */
    var getTimeStamp = function (prefix) {
        if (checkDataNotEmpty(prefix)) {
            return prefix + '' + (new Date()).valueOf();

        } else {
            return (new Date()).valueOf();
        }
    };


    /**
     * 设置需要添加完成动画时添加此句
     */
    var setSubmitAnimateSuccess = function (successWord) {
        $rootScope['saveAnimate'] = true;
        if (OverallGeneralSer.checkDataNotEmpty(successWord)) {
            $rootScope['successWord'] = successWord;
        } else {
            $rootScope['successWord'] = "Save Successfully";
        }
        /*设置timeout时间为2秒，2秒后该$rootScope['saveAnimate']变为false，下次可通过再次变为true继续出现动画*/
        $timeout(function () {
            $rootScope['saveAnimate'] = false;
        }, 1700);
    };


    /**
     * http 请求错误返回的处理
     * @param errFunction
     * @param errCode
     * @param err
     */
    var alertHttpRequestError = function (errFunction, errCode, err) {
        //请求出错打印错误消息和弹出alert视窗提醒客户
        console.error(errFunction, errCode, err);
        alert("Sorry, service error please try again later.\n很抱歉，服务异常，请稍后重试");
    };


    return {
        getTimeStamp: getTimeStamp,
        sqlInjectFilter: sqlInjectFilter,
        checkDataNotEmpty: checkDataNotEmpty,
        alertHttpRequestError: alertHttpRequestError,
        setSubmitAnimateSuccess:setSubmitAnimateSuccess,
    }
});
