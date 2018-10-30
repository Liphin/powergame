/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('HomePageSer', function ($http,$window, $location,$routeParams,$cookies, HomePageDataSer, OverallSer, OverallGeneralSer, OverallDataSer) {


    /**
     * 进入页面解析路径操作
     */
    var parsePath = function () {
        //路径参数获取
        //var targetType = $routeParams['option'];
        var targetSubPage = $location.search()['subPage'];

        alert("测试页面跳转");
        alert(JSON.stringify(targetSubPage));

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
        }
        initSubPage(targetSubPage);
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
                break;
            }
            //查看分享页面
            case 'enjoyPage': {
                break;
            }
            //查看我的成绩
            case 'myHarvest' : {
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
    var dataInit = function () {
        //设置标题数据
        alert("初始化");
        var parameters = $location.search();
        HomePageDataSer.overallHomeData['commonData']['param'] = parameters; //装载参数数据
        alert(JSON.stringify(HomePageDataSer.overallHomeData['commonData']['param']));

        //获取用户数据，从本地的cookie中读取数据
        var userInfo = Cookies.getJSON('userInfo');
        if (OverallGeneralSer.checkDataNotEmpty(userInfo)) {
            //装载user数据
            loadUserData(userInfo);

        } else {
            //根据url是否有code参数逻辑处理
            if (OverallGeneralSer.checkDataNotEmpty(parameters['code'])) {
                //如果有code则进行code请求user数据
                getUserInfo(parameters['code']);

            } else {
                //如果无code则进行code请求，并redirect回该页面
                alert("code为0");
                reloadPageAndGetCompanyCode();
            }
        }
    };


    /**
     * 先获取用户信息openid
     */
    var getUserInfo = function (code) {
        //http请求获取user信息数据
        var url = HomePageDataSer.getWxUserInfo + '?code=' + code;
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
                    //alert('get cookies: ' + JSON.stringify(Cookies.getJSON('userInfo')));
                    loadUserData(data);
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
        alert(JSON.stringify(OverallDataSer.overallData['userInfo']['openid']));
    };

    /**
     * 进入预览新闻数据
     */
    var reloadPageAndGetCompanyCode = function () {
        OverallDataSer.viewNewsDetailSetting['redirect_uri'] = $location.absUrl();
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
        dataInit: dataInit,
        parsePath: parsePath,
    }
});
