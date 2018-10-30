/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage',[]);

homePageModule.config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: true,
        requireBase: true
    });
});