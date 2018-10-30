/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallSer', function ($rootScope, OverallDataSer, $location, $http, OverallGeneralSer) {

    /**
     * 鼠标事件停止传递
     * @param $event
     */
    var preventEventTransport = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };


    /**
     * modal的黑色遮罩层背景去掉
     */
    var modalBackRemove = function () {
        $(".modal-backdrop").remove();
    };


    /**
     * 获取sql注入的每个key word
     */
    var getSqlInjectFilterWords = function () {
        /*获取所有嫌疑sql注入key word*/
        var allSqlKeyWords = OverallDataSer.urlData['frontEndHttp']['getSqlKeyWord'];

        //1. 如果尚未获取全部sql key word数据则http请求获取
        if (Object.keys(OverallDataSer.sqlVerify.length <= 0)) {
            $http({
                method: 'GET',
                url: allSqlKeyWords
            }).then(function successCallback(response) {
                if (response['status'] == 200) {
                    OverallDataSer.sqlVerify = response['data'].split(",");
                }
            }, function errorCallback(err) {
                OverallSer.alertHttpRequestError("OverallSer.sqlInjectFilter", 500, err);
            });
        }
    };


    /**
     * 对获取的User Status进行渲染页面前达标判断
     * 并针对不达标情况进行页面跳转处理
     * @param targetCamLevel
     * @param redirectPath
     */
    var processLogonStatus = function (targetCamLevel, redirectPath) {
        var verifiedCamLevel = getUserLogonStatus();
        //判断cam级别是否达标，如果不达标则进行相应跳转，
        //并返回bool值告知controller不再进行运行；否则告知达标true
        var result = verifiedCamLevel >= targetCamLevel;
        //如果result为false则直接跳转到指定redirect的path
        if (!result) {
            $location.path(redirectPath);
        }
        return result;
    };

    /**
     * 用户登录状态验证，返回登录级别
     * 10 用户尚未登录或登录信息已超时，请重新登录
     * 20 用户已经登录，可进入manager会话组页面
     */
    var getUserLogonStatus = function () {
        //初始化用户尚未登录或登录信息已超时，设置最低10级别
        var verifiedCamLevel = 10;
        // if ((OverallGeneralSer.checkDataNotEmpty($cookies.get('openid')) ||
        //     OverallGeneralSer.checkDataNotEmpty(OverallDataSer.overallData['userInfo']['openid']))) {
        //     //用户已经登录，但尚无项目编号信息，返回20级别
        //     verifiedCamLevel = 20;
        //     if (!OverallGeneralSer.checkDataNotEmpty(OverallDataSer.overallData['userInfo']['openid'])) {
        //         OverallDataSer.overallData['userInfo']['openid'] = $cookies.get('openid');
        //         getUserData($cookies.get('openid'));
        //
        //     } else {
        //         //延长cookie超时时间
        //         $cookies.put('openid', OverallDataSer.overallData['userInfo']['openid'],
        //             {'expires': OverallGeneralSer.getNewCookiesExpireDate()});
        //     }
        // }
        return verifiedCamLevel;
    };


    /**
     * 根据用户id获取用户相关信息
     * @param wx_user_id
     * @param session_id
     */
    var getUserData = function (openid, session_id) {
        var fd = new FormData();
        fd.append('openid', openid);

        //提交表单数据
        $http.post(OverallDataSer.urlData['backEndHttp']['getUserInfoByIdAndSessionId'], fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if (response['status_code'] == 200) {
                //设置管理者用户信息数据
                for (var i in response['data']) {
                    OverallDataSer.overallData['userInfo'][i] = response['data'][i];
                }
            } else {
                alert('回话超时，请重新尝试');
                $location.path(OverallDataSer.redirect['homePage']);
            }
        }).error(function (err) {
            //请求出错打印错误消息和弹出alert视窗提醒客户
            OverallSer.alertHttpRequestError("OverallSer.getUserData: ", 600, err);
        })
    };


    /**
     * 把image的data数据转化为blob数据
     * @param dataURI
     * @returns {Blob}
     */
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = decodeURI(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
    }


    /**
     * 上传资源文件信息
     * 用于提交文件操作，并开放callback函数接口
     */
    var uploadResource = function (file, timestamp, callback) {
        var fd = new FormData();
        fd.append('new_resource', file);
        fd.append('timestamp', timestamp);
        //提交表单数据
        var url = OverallDataSer.urlData['backEndHttp']['uploadResource'];
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if (response['status_code'] == 200) {
                callback(response['data']);

            } else {
                OverallGeneralSer.alertHttpRequestError("uploadResource", response['exception_code'], response['exception']);
            }
        }).error(function (err) {
            OverallGeneralSer.alertHttpRequestError("uploadResource", 600, err);
        })
    };





    return {
        uploadResource: uploadResource,
        dataURItoBlob: dataURItoBlob,
        modalBackRemove: modalBackRemove,
        preventEventTransport: preventEventTransport,

        //分别获取sql注入的key word方法和监测是否有该注入
        getSqlInjectFilterWords: getSqlInjectFilterWords,
        processLogonStatus: processLogonStatus,
    }
});
