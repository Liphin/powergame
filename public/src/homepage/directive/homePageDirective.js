/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

/**
 * 展示手机弹窗的HTML内容
 */
homePageModule.directive('viewPhoneHtml', ['HomePageDataSer', function (HomePageDataSer) {
    return {
        restrict: 'A',
        link: function (scope, ele, attrs) {
            ele.html(HomePageDataSer.overallHomeData['phoneView']['html']);
        }
    }
}]);

