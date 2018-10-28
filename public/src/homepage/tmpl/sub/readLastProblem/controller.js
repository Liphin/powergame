/**
 * Created by Administrator on 2018/10/08.
 */
var app = angular.module('myApp');
/**
 * 页面控制器方法
 */
app.controller('MyCtrl', function ($scope, $http, $window, $location, MyData, MySer) {
    //数据初始化操作
    var ctrl = this;
    ctrl.newsList = MyData.newsList;
    ctrl.overallData = MyData.overallData;
    MySer.initData();

    /**
     * 进入预览新闻数据
     */
    ctrl.viewDynamicDetail = function (news) {
        //携带timestamp参数用来标识该新闻在userDynamic表中对应的timestamp条目
        if (news['status_cd']==0 || news['status_cd']==4) {
            location.href = MyData.createFriendCircleDetailUrl + "?timestamp=" + news['timestamp'] + "&title=" + news['title']+"&status_cd="+news['status_cd']+"&dept_all_target="+news['dept_all_target']+"&dept_target="+news['dept_target'];
        }
        else{
            alert("只有记录处于草稿或审核不通过的状态才能进行编辑");
        }

    };

    /**
     * 搜索新闻
     * @see MySer.searchNews
     */
    ctrl.searchNews = function () {
        MySer.searchNews();
    }
});