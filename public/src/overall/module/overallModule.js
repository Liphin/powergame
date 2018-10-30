/**
 * Created by Administrator on 2018/2/28.
 */
var overallModule = angular.module('Angular',
    [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'Angular.homepage', //首页模块
    ]);

//重置HTML的url即，可以无需hash情况使用$location
overallModule.config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: false,
        requireBase: false
    });
});