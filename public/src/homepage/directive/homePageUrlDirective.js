/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

/**
 * 设置网页路径
 */
// overallModule.directive('saveAnimate', ['$document', function ($document) {
//     return {
//         restrict: 'E',
//         templateUrl: 'src/overall/tmpl/saveAnimate.html'
//     };
// }]);

/**
 * 进入游戏首页
 */
homePageModule.directive('homePage', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/homePage/homePage.html'
    };
}]);

/**
 * 闯关地图
 */
homePageModule.directive('homeChallengeAltas', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/challengeAltas/challengeAltas.html'
    };
}]);

/**
 * 答题页面
 */
homePageModule.directive('homeAnswer', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/answer/answer.html'
    };
}]);

/**
 * 分享页面
 */
homePageModule.directive('homeEnjoyPage', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/enjoyPage/enjoyPage.html'
    };
}]);

/**
 * 我的成绩
 */
homePageModule.directive('homeMyHarvest', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/myHarvest/myHarvest.html'
    };
}]);

/**
 * 阅读最后材料
 */
homePageModule.directive('homeReadLastProblem', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/readLastProblem/readLastProblem.html'
    };
}]);

/**
 * 阅读材料
 */
homePageModule.directive('homeReadProblem', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/readProblem/readProblem.html'
    };
}]);

/**
 * 阅读材料
 */
homePageModule.directive('homeViewGameRule', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/sub/viewGameRule/viewGameRule.html'
    };
}]);

/**
 * 手机弹窗
 */
homePageModule.directive('homePhoneWindows', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/homepage/tmpl/common/phoneWindows.html'
    };
}]);









