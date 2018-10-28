/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.controller('HomePageCtrl', function ($location, HomePageDataSer, HomePageSer) {

    var homepage = this;
    homepage.userInfo = HomePageDataSer.userInfo;
    HomePageSer.parsePath(); //解析路径操作
    HomePageSer.initData();

    /**
     * 进行栏目内部页面跳转
     * @param subPage
     */
    homepage.chooseProjectSubPage = function (subPage) {
        $location.search('subPage', subPage);
    };

    /**
     * 确定答案
     */
    homepage.sureAnswer=function () {
    };

    /**
     * 线下扫码答题
     */
    homepage.sweepCode=function () {
    };



});