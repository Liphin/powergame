/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('HomePageSer', function ($http,$window, $location,$routeParams, HomePageDataSer, OverallSer, OverallGeneralSer, OverallDataSer, EnjoyPageSer, ChallengeAltasSer) {


    /**
     * 进入页面解析路径操作
     */
    var parsePath = function () {
        //路径参数获取
        //var targetType = $routeParams['option'];
        var targetSubPage = $location.search()['subPage'];

        //alert("测试页面跳转");
        //alert(JSON.stringify(targetSubPage));
        //console.log('subPage',targetSubPage);

        // //检查url路径数据
        // if (!OverallGeneralSer.checkDataNotEmpty(targetSubPage)) {
        //     //若路径数据不全则默认打开内容栏目的新闻列表页面
        //     alert("测试进入首页");
        //     $location.search({'subPage': 'homePage'});
        //     return;
        //
        // } else {
        //     initSubPage(targetSubPage);
        // }
        if(!OverallGeneralSer.checkDataNotEmpty(targetSubPage)){
            //alert("测试进入首页");
            $location.search({'subPage': 'homePage'});
            return;

        }else {
            dataInit(targetSubPage);
        }
    };

    /**
     * 打开目标子页面操作
     */
    var initSubPage = function (targetSubPage) {
        //先设置全部页面不显示
        for (var i in HomePageDataSer.navigation) {
            HomePageDataSer.navigation[i]=false;
        }
        //单独设置目标页面显示
        HomePageDataSer.navigation[targetSubPage] = true;

        //根据目标页面和需求进行设置
        switch (targetSubPage) {
            //http请求加载获取news数据
            case 'answer': {
                break;
            }
            //查看闯关地图
            case 'challengeAltas': {
                ChallengeAltasSer.getChallengeAltas();
                break;
            }
            //查看分享页面
            case 'enjoyPage': {
                EnjoyPageSer.getEnjoyInfo();
                break;
            }
            //查看我的成绩
            case 'myHarvest' : {
                MyHarvestSer.getMyHarvestData();
                break;
            }
            //阅读最后的题目
            case 'readLastProblem' : {
                break;
            }
            //阅读题目材料
            case 'readProblem' : {
                break;
            }
            //查看活动规则
            case 'viewGameRule' : {
                break;
            }
            //进入首页
            case 'homePage' : {
                break;
            }
            default: {
                break;
            }
        }

        //滚动到页面最顶端
        $window.scrollTo(0, 0);
    };



    /**
     * 初始化页面数据操作
     */
    var dataInit = function (targetSubPage) {
        //设置标题数据
        var parameters = $location.search();
        HomePageDataSer.overallHomeData['commonData']['param'] = parameters; //装载参数数据
        console.log(targetSubPage);

        //获取用户数据，从本地的cookie中读取数据
        var userInfo = Cookies.getJSON('userInfo');
        console.log('userInfo',userInfo);
        if (OverallGeneralSer.checkDataNotEmpty(userInfo)) {
            //装载user数据
            loadUserData(userInfo);
            initSubPage(targetSubPage);

        } else {
            //根据url是否有code参数逻辑处理
            if (OverallGeneralSer.checkDataNotEmpty(parameters['code'])) {
                //如果有code则进行code请求user数据
                getUserInfo(parameters['code'],targetSubPage);

            } else {
                reloadPageAndGetCompanyCode();
            }
        }
    };


    /**
     * 先获取用户信息openid
     */
    var getUserInfo = function (code,targetSubPage) {
        //http请求获取user信息数据
        var url = HomePageDataSer.getWxUserInfo + '?code=' + code;
        console.log("重新获取用户数据");
        $http({method: 'GET', url: url}).then(function successCallback(response) {
            if (response['status'] == 200) {
                var data = response['data'];
                if (data == '400') {
                    alert('获取用户失败');

                } else if (data == ' 500') {
                    alert('系统错误，服务器异常，请稍后重试,');

                } else {
                    //装载userInfo数据到cookies
                    Cookies.set('userInfo', data, {expires: 7});
                    console.log('userInfo',Cookies.getJSON('userInfo'));
                    loadUserData(data);
                    initSubPage(targetSubPage);
                }
            }
        }, function errorCallback(err) {
            alert("尊敬的客户，服务器异常，请稍后重试.," + err)
        });
    };


    /**
     * 装载用户数据
     */
    var loadUserData = function (data) {
        //装载user info数据
        HomePageDataSer.userInfo= data;
        OverallDataSer.overallData['userInfo']['openid']=HomePageDataSer.userInfo['openid'];
        //alert(JSON.stringify(OverallDataSer.overallData['userInfo']['openid']));
    };

    /**
     * 进入预览新闻数据
     */
    var reloadPageAndGetCompanyCode = function () {
        OverallDataSer.viewNewsDetailSetting['redirect_uri'] = $location.absUrl();
        //alert(JSON.stringify(OverallDataSer.viewNewsDetailSetting['redirect_uri']));
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" + jQuery.param(OverallDataSer.viewNewsDetailSetting) + "#wechat_redirect"
    };

    //开始闯关
    var goAltatsLink = function () {


    }

    //活动规则
    var goGameRule = function () {


    }

    //分享
    var goEnjoy = function () {


    }



    return {
        parsePath: parsePath,
    }
});
