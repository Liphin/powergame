/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('HomePageDataSer', function (OverallDataSer) {

    //前台请求api
    var serverHost = 'http://powersupply.liphin.com';
    var frontSerPort = 3030;
    var getWxUserInfo = serverHost + ":" + frontSerPort + "/getWxUserInfo";
    // var goChallengeAltas=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/challengeAltas/challengeAltas.html";
    // var goEnjoyPage=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/enjoyPage/enjoyPage.html";
    // var goMyHarvest=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/myHarvest/myHarvest.html";
    // var goReadLastProblem=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/readLastProblem/readLastProblem.html";
    // var goReadProblem=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/readProblem/readProblem.html";
    // var goViewGameRule=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/viewGameRule/viewGameRule.html";

    //用户信息
    var userInfo = OverallDataSer.overallData[userInfo];

    //全局数据
    var overallHomeData = {
        //生成的手机弹窗
        'phoneView': {
            'status': false,
            'title': '', //标题, TODO
            'titleText': '', //标题文字, TODO
            'contentWord': '', //文本正文 TODO
            'buttonTitle': '', //按钮文本 TODO
            'buttonAction': '', //按钮动作 TODO
            'editHtml': '<p><br></p>',
        },
        //公共参数
        'commonData': {
            //记录url中参数
            'param': '',

        }
    };

    //内部页面跳转展示
    var navigation = {
        'homePage': false,
        'answer': false,
        'challengeAltas': false,
        'myHarvest': false,
        'readLastProblem': false,
        'readProblem': false,
        'viewGameRule': false,
        'enjoyPage': false,
        'phoneWindows': false,
    };

    return {
        userInfo: userInfo,
        overallHomeData: overallHomeData,
        getWxUserInfo: getWxUserInfo,
        navigation: navigation,
    }
});
