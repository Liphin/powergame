/**
 * Created by Administrator on 2018/10/08.
 */
var app = angular.module('myApp');

/*数据集*/
app.factory('MyData', function () {
    var serverHost = 'http://powersupply.liphin.com';
    //var serverHost = 'http://127.0.0.1';
    var frontSerPort = 3031;
    var backSerPort = 8089;
    var FRIEND_CIRCLE_TYPE = 7;
    var friendCircleAgentId = 1000004;
    var wxuserid = '';


    var newsList = [];
    var maxNum = '2088-01-01 00:00:00';
    var phoneHeadHtmlUrl = serverHost + ":" + frontSerPort + "/helper/phone/phoneHtmlHead.html";
    var getUserFriendInfoToPhone = serverHost + ":" + backSerPort + "/getUserFriendInfoToPhone"; //获取所有新闻数据
    var htmlBaseUrl = serverHost + ":" + frontSerPort + "/dynamicinfo/html/";
    var coverImgBaseUrl = serverHost + ":" + frontSerPort + "/dynamicinfo/coverimg/";
    var searchUserNews = serverHost + ":" + backSerPort + "/searchUserNews"; //搜索后台新闻数据
    //var createFriendCircleDetailUrl = serverHost + ":" + frontSerPort + "/src/content/tmpl/sub/friendcircle/phoneFriendCircleUserOpt.html";
    var getUserCompanyInfo = serverHost + ":" + frontSerPort + "/getCompanyUserInfo";
    var createFriendCircleDetailUrl = serverHost + ":" + frontSerPort + "/src/content/tmpl/sub/friendcircle/phone/myOpt/index.html";

    var viewNewsDetailSetting = {
        'appid': 'wx07e7ab9ca2afed96',
        'redirect_uri': '',
        'response_type': 'code',
        'scope': 'snsapi_userinfo',
        'agentid': '',
        'state': 'STATE',
    };

    var packHtml = {
        'phoneHeadHtml': '',
        'phoneEndHtml': '',
        'defaultTitle': '__TITLE__',
    };

    //设置对象数据
    var overallData = {
        markLoadingNews: false, //标识是否正在加载新闻数据
        param: '',//记录url中参数
        timestamp: '', //timestamp数据
        search: '', //搜索框的内容
    };

    //用户数据
    var userInfo = {};

    return {
        userInfo: userInfo,
        maxNum: maxNum,
        packHtml: packHtml,
        phoneHeadHtmlUrl: phoneHeadHtmlUrl,
        newsList: newsList,
        overallData: overallData,
        htmlBaseUrl: htmlBaseUrl,
        searchUserNews: searchUserNews,
        coverImgBaseUrl: coverImgBaseUrl,
        FRIEND_CIRCLE_TYPE: FRIEND_CIRCLE_TYPE,
        createFriendCircleDetailUrl: createFriendCircleDetailUrl,
        getUserFriendInfoToPhone: getUserFriendInfoToPhone,
        friendCircleAgentId: friendCircleAgentId,
        viewNewsDetailSetting: viewNewsDetailSetting,
        getUserCompanyInfo: getUserCompanyInfo,
        wxuserid: wxuserid,
    }
});