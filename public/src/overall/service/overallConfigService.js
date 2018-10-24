/**
 * Created by Administrator on 2018/2/28.
 */

var overallModule = angular.module('Angular');

overallModule.config(function ($routeProvider, $httpProvider, $sceDelegateProvider) {

    $routeProvider
        .when('/overall/:option', {
            templateUrl: 'src/overall/tmpl/overall.html',
            controller: 'OverallCtrl',
            controllerAs: 'overall'
        })
        .otherwise({redirectTo: '/overall/general'});

    //部署拦截器，每次http请求，会经过拦截器方法后再往下传
    $httpProvider.interceptors.push('interceptHttp');
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '**'
    ]);
});