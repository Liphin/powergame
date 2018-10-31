/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('ChallengeAltasSer', function ($http, $window, $timeout, $location, HomePageDataSer, HomePageSer,OverallGeneralSer,OverallDataSer) {

    var getChallengeAltas = function () {
        //显示加载数据loading界面
        HomePageDataSer.pageLoadData['loadData'] = true;
        HomePageDataSer.pageLoadData['loadDataText'] = '正在提交信息...';

        var userOpenid=OverallDataSer.overallData['userInfo']['openid'];
        //装载表单数据
        var fd = new FormData();
        //设置用户openid
        fd.append('openid', userOpenid);
        //请求用户活动信息
        $http.post(HomePageDataSer.getUserActInfo,fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if(response['status_code']==200) {
                if(OverallGeneralSer.checkDataNotEmpty(response['data'])) {
                    //初始化页面数据
                    HomePageDataSer.pageCtrData['challengeAltas']['actFlag']=1;
                    inItAltasPageData(response['data']);
                }
                else {
                    //如果该用户没有活动信息，则该用户第一次进行闯关，需新增数据库记录
                    $http.post(HomePageDataSer.setUserActInfo,fd,{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined},
                    }).success(function (response) {
                        if(response['status_code']==200) {
                            //初始化页面
                            HomePageDataSer.pageCtrData['challengeAltas']['actFlag']=0;
                            inItAltasPageData(response['data']);
                        }
                        else {
                            alert("尊敬的客户，服务器异常，请稍后重试'.");
                        }

                    }).error(function (err) {
                        alert("尊敬的客户，服务器异常，请稍后重试._");
                        HomePageDataSer.pageLoadData['loadData'] = false;
                    })
                }
            }
            else {
                alert("尊敬的客户，服务器异常，请稍后重试'..");
            }
        }).error(function (err) {
            alert("尊敬的客户，服务器异常，请稍后重试.__");
            HomePageDataSer.pageLoadData['loadData'] = false;
        }).finally(function () {
            //关闭loading数据界面
            HomePageDataSer.pageLoadData['loadData'] = false;
        })
    }

    var inItAltasPageData = function (data) {
        if(HomePageDataSer.pageCtrData['challengeAltas']['actFlag']==0){
            //用户第一次闯关，所有关卡都没有进入过，没有进入过的关卡呈现灰色
            HomePageDataSer.pageCtrData['challengeAltas']['pass_1']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['pass_2']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['pass_3']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['pass_4']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['chance_num']=1;

            //赋值用户关卡的状态 false-没有通过  true-通过
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_1']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_2']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_3']=0;
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_4']=0;

            //用户我的成绩页面数据  默认是0 定义时已是0
        }
        else{
            HomePageDataSer.userActInfo=data;
            HomePageDataSer.pageCtrData['challengeAltas']['chance_num']=HomePageDataSer.userActInfo['chance_num'];
            //根据用户闯过的关卡动态显示页面按钮的颜色
            HomePageDataSer.pageCtrData['challengeAltas']['pass_1']=HomePageDataSer.userActInfo['pass_1'];
            HomePageDataSer.pageCtrData['challengeAltas']['pass_2']=HomePageDataSer.userActInfo['pass_2'];
            HomePageDataSer.pageCtrData['challengeAltas']['pass_3']=HomePageDataSer.userActInfo['pass_3'];
            HomePageDataSer.pageCtrData['challengeAltas']['pass_4']=HomePageDataSer.userActInfo['pass_4'];

            //赋值用户关卡的状态 false-没有通过  true-通过
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_1']=HomePageDataSer.userActInfo['passStatus_1'];
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_2']=HomePageDataSer.userActInfo['passStatus_2'];
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_3']=HomePageDataSer.userActInfo['passStatus_3'];
            HomePageDataSer.pageCtrData['challengeAltas']['passStatus_4']=HomePageDataSer.userActInfo['passStatus_4'];

            //用户我的成绩页面数据
            HomePageDataSer.pageCtrData['challengeAltas']['enjoy_num']=HomePageDataSer.userActInfo['enjoy_num'];
            HomePageDataSer.pageCtrData['challengeAltas']['chance_num']=HomePageDataSer.userActInfo['chance_num'];
            HomePageDataSer.pageCtrData['challengeAltas']['harvest_flag']=HomePageDataSer.userActInfo['harvest_flag'];
            HomePageDataSer.pageCtrData['challengeAltas']['harvest_type']=HomePageDataSer.userActInfo['harvest_type'];
            HomePageDataSer.pageCtrData['challengeAltas']['harvest_money']=HomePageDataSer.userActInfo['harvest_money'];
        }
    }

    return {
        getChallengeAltas: getChallengeAltas,
    }

});