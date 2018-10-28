/**
 * Created by Administrator on 2018/9/29.
 */
var app = angular.module('myApp');
/**
 * server服务方法
 */
app.factory('MyGeneralSer', function ($window, $document, $http, MyData, $location) {

    /**
     * 重新进入该页面，获取个人数据获取的code
     */
    var reloadPageAndGetCompanyCode = function () {
        MyData.viewNewsDetailSetting['redirect_uri'] = $location.absUrl();
        MyData.viewNewsDetailSetting['agentid'] = MyData.friendCircleAgentId;
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" + jQuery.param(MyData.viewNewsDetailSetting) + "#wechat_redirect";
    };

    /** 工具类 **************************************************************************************/
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
     * http post获取资源数据
     */
    var httpPostData = function (url, obj, callback) {
        //设置loading状态
        MyData.overallData['loadData'] = true;

        var fd = new FormData();
        //动态装载数据
        for (var i in obj) {
            fd.append(i, obj[i]);
        }
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},

        }).success(function (response) {
            //返回正确操作后执行回调函数
            // callback(response);
            if (response['status_code'] == 200) {
                //返回正确操作后执行回调函数
                callback(response['data']);

            } else {
                alert(MyData.requestDataErrorMsg + ".");
            }
        }).error(function (err) {
            alert(MyData.requestDataErrorMsg + ",");

        }).finally(function () {
            //设置loading状态
            MyData.overallData['loadData'] = false;
        });
    };

    /**
     * 组装生成新闻时间
     * @param createTime
     * @returns {string}
     */
    var generateShowTime = function (createTime) {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        var replaceTime = createTime.replace(/\-/g, "/");
        var targetTime = new Date(replaceTime);
        if (today - targetTime < 0) {
            //当天发的新闻
            return targetTime.getHours() + ":" + targetTime.getMinutes();

        } else {
            //之前发的新闻
            return (targetTime.getMonth() + 1) + "月" + targetTime.getDate() + "日";
        }
    };


    return {
        generateShowTime: generateShowTime,
        httpPostData: httpPostData,
        checkDataNotEmpty: checkDataNotEmpty,
        reloadPageAndGetCompanyCode: reloadPageAndGetCompanyCode,
    }
});