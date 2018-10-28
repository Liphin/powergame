/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallDataSer', function ($rootScope) {
    //全局配置信息
    var overallData = {
        //屏幕宽高数据
        'screen': {'width': '', 'height': ''},
        //用户数据
        'userInfo': {
            'openid': '',
            'nickname': '',
            'sex': '',
            'language': '',
            'city': '',
            'province': '',
            'country': '',
            'headimgurl': '',
            'privilege': '',
            'timestamp': '',
            'create_time': '',
            'update_time': '',
        },
    };

    /* URL系统各种文件获取的URL设置 */
    var baseUrlData = {
        'backEndHttp': "http://127.0.0.1:8081/",
        'frontEndHttp': "http://127.0.0.1:3030/",
    };

    /*各种路径信息设置*/
    var urlData = {
        'backEndHttp': {
            'saveActData': baseUrlData['backEndHttp'] + 'saveActData', //保存答题数据
            'searchActData': baseUrlData['backEndHttp'] + 'searchActData', //搜索个人答题情况
            'uploadResource': baseUrlData['backEndHttp'] + 'uploadResource', //上传资源文件操作
            'searchHarvestData': baseUrlData['backEndHttp'] + 'searchHarvestData', //搜索个人获奖情况
        },
        'frontEndHttp': {
            'getSqlKeyWord': baseUrlData['frontEndHttp'] + 'helper/sqlKeyWord.txt',//防止SQL注入攻擊
        }
    };

    //用于sql注入filter
    var sqlVerify = [];

    //location.path的重定向
    var redirect = {
        'homePage': '/homepage/home',
    };
    //z-index级别信息
    var zIndexHelper = {
        'loading': 500000,
        'info_background':10002,
        'info':10003,
    };

    //用户信息数据
    var userInfo = {
        'user': [],
    };

    //模态框消息提醒设置操作
    var modalSetting = {
        'lg': {
            'videoUrl': false,//填写多媒体的分享url
        },
        'sm': {}
    };


    return {
        urlData: urlData,
        redirect: redirect,
        sqlVerify: sqlVerify,
        overallData: overallData,
        baseUrlData: baseUrlData,
        userInfo: userInfo,
        modalSetting: modalSetting,
        zIndexHelper: zIndexHelper,
    }
});
