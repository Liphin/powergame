/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('HomePageDataSer', function (OverallDataSer) {

    //前台请求api
    var serverHost = 'http://powergame.liphin.com';
    var backSerPort = 8084;
    var frontSerPort = 3034;
    var getWxUserInfo = serverHost + ":" + frontSerPort + "/getWxUserInfo";
    var getUserActInfo = serverHost + ":" + backSerPort + "/getUserActInfo";
    var setUserActInfo = serverHost + ":" + backSerPort + "/setUserActInfo";
    var updateUserActInfo = serverHost + ":" + backSerPort + "/updateUserActInfo";
    // var goChallengeAltas=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/challengeAltas/challengeAltas.html";
    // var goEnjoyPage=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/enjoyPage/enjoyPage.html";
    // var goMyHarvest=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/myHarvest/myHarvest.html";
    // var goReadLastProblem=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/readLastProblem/readLastProblem.html";
    // var goReadProblem=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/readProblem/readProblem.html";
    // var goViewGameRule=serverHost + ":" + frontSerPort + "/src/homepage/tmpl/sub/viewGameRule/viewGameRule.html";

    //用户数据
    var userInfo = {};

    //用户活动数据
    var userActInfo = {};

    //页面控制数据
    var pageCtrData= {

        //页面跳转数据控制
        'pageChange': {
            'pass_flag': '', //1-第一关 2-第二关 3-第三关 4-第四关
            'page_common_act': '',//公共弹出窗的动作 goEnjoy-去分享  goNextPass--下一关
        },
        //闯关地图数据
        'challengeAltas': {
            'actFlag': 0, //0-代表用户第一次闯关，1-代表用户不是第一次闯关
            'pass_1': 0, //false-没有机会闯关  true-有机会闯关
            'pass_2': 0,
            'pass_3': 0,
            'pass_4': 0,
            'passStatus_1': 0, //0-没有通过  1-通过
            'passStatus_2': 0,
            'passStatus_3': 0,
            'passStatus_4': 0,
            'chance_num': 0,
            'harvest_money': 0,
        },
        //我的成绩数据
        'muHarvest': {
            'enjoy_num': 0,
            'chance_num': 0,
            'harvest_flag': 0,
            'harvest_type': 0,
            'harvest_money': 0,
        },
    }

    //页面加载Loading控制对象
    var pageLoadData = {
        loadData: false, //标识是否正在加载新闻数据
        loadDataText: '',//加载时的文字表示
    };

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
        overallHomeData: overallHomeData,
        getWxUserInfo: getWxUserInfo,
        navigation: navigation,
        userInfo: userInfo,
        updateUserActInfo: updateUserActInfo,
        setUserActInfo: setUserActInfo,
        getUserActInfo: getUserActInfo,
        userActInfo: userActInfo,
        pageCtrData: pageCtrData,
        pageLoadData: pageLoadData,
    }
});
