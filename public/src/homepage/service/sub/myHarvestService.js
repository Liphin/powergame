
/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('MyHarvestSer', function ($http, $window, $timeout, $location, HomePageDataSer,OverallGeneralSer,OverallDataSer) {

    var getMyHarvestData = function() {
        var userOpenid=OverallDataSer.overallData['userInfo']['openid'];
        console.log(userOpenid);
    }

    return {
        getMyHarvestData: getMyHarvestData,
    }

});