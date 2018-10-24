/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular');

overallModule.factory('OverallDataSer', function ($rootScope) {

    var overallData = {};

    /* Url 系统各种文件获取的URL设置 */
    var baseUrlData = {
        'backEndHttp': "http://127.0.0.1:8080/",
        'frontEndHttp': "http://127.0.0.1:3030/",
        'ossHttp': "",
        'resource_http_request': '',
    };

    var urlData = {

        'backEndHttp': {
            'getAllCompany': baseUrlData['backEndHttp'] + 'getAllCompany',
        },

        'frontEndHttp': {
            'getSqlKeyWord': baseUrlData['frontEndHttp'] + 'helper/sqlKeyWord.txt',

        }
    };

    //用于sql注入filter
    var sqlVerify=[];


    var zIndexHelper = {
        'loading': 500000,
    };


    return {
        urlData: urlData,
        sqlVerify:sqlVerify,
        overallData: overallData,
        baseUrlData: baseUrlData,
        zIndexHelper: zIndexHelper,
    }
});
