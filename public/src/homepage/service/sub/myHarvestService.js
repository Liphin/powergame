/**
 * Created by Administrator on 2018/2/28.
 */
var homePageModule = angular.module('Angular.homepage');

homePageModule.factory('MyHarvestSer', function ($http, $window, $timeout, $location, HomePageDataSer) {

    var getMyHarvestData = function () {

    }

    return {
        getMyHarvestData: getMyHarvestData,
    }

});