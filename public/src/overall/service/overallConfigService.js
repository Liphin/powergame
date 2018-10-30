/**
 * Created by Administrator on 2018/2/28.
 */

var overallModule = angular.module('Angular');

overallModule.config(function ($routeProvider, $httpProvider, $sceDelegateProvider, $locationProvider) {
    $routeProvider
        .when('/homepage', {
            templateUrl: 'src/homepage/tmpl/page.html',
            controller: 'HomePageCtrl',
            controllerAs: 'homepage',
            // resolve: {
            //     check: function (OverallSer) {
            //         return OverallSer.processLogonStatus(20, '/homepage');
            //     }
            // }
        })
        .otherwise({redirectTo: '/homepage'});

    //采用HTML5mode方式加载数据
    $locationProvider.html5Mode(true);

    //部署拦截器，每次http请求，会经过拦截器方法后再往下传
    $httpProvider.interceptors.push('interceptHttp');
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '**'
    ]);
});