/**
 * Created by Administrator on 2018/10/08.
 */
var app = angular.module('myApp');
/**
 * server服务方法
 */
app.factory('MySer', function ($window, $document, $http, MyData, $location,MyGeneralSer) {

    /**
     * 监测网页向下滚动滑动触发的操作
     * TODO 暂时全部数据一次性获取，无需分批次获取
     */
//        angular.element($window).on("scroll", function (e) {
//            if ($window.pageYOffset + $window.innerHeight + 20 >= $document.height()) {
//                //若正在加载数据，则需等待加载完成后再进行获取数据
//                if (!MyData.overallData['markLoadingNews']) {
//                    getUserFriendInfoToPhoneData();
//                }
//            }
//        });
    /**
     * 初始化页面数据操作
     */
    var initData = function () {
        //设置标题数据
        var parameters = $location.search();
        MyData.overallData['param'] = parameters; //装载参数数据

        //获取用户数据，从本地的cookie中读取数据
        var userInfo = Cookies.getJSON('userInfo');
        if (MyGeneralSer.checkDataNotEmpty(userInfo)) {
            //循环装载user数据
            for (var i in userInfo) {
                MyData.userInfo[i] = userInfo[i];
            }
            //初始化timestamp数据
            MyData.overallData['timestamp'] = MyData.userInfo['userid'] + '_' + (new Date()).valueOf();

            //初始化用户id
            MyData.wxuserid=MyData.userInfo['userid'];
            getUserFriendInfoToPhoneData();

        } else {
            //根据url是否有code参数逻辑处理
            if (MyGeneralSer.checkDataNotEmpty(parameters['code'])) {
                //如果有code则进行code请求user数据
                getUserInfo(parameters['code']);

            } else {
                //如果无code则进行code请求，并redirect回该页面
                MyGeneralSer.reloadPageAndGetCompanyCode();
            }
        }
    };


    /**
     * 先获取用户信息，如果该用户是本公司员工则允许查看消息，否则不允许查看消息
     */
    var getUserInfo = function (code) {
        //http请求获取user信息数据
        var url = MyData.getUserCompanyInfo + '?code=' + code + '&type=' + MyData.FRIEND_CIRCLE_TYPE;
        $http({method: 'GET', url: url}).then(function successCallback(response) {
            if (response['status'] == 200) {
                var data = response['data'];
                if (data == '400') {
                    alert('很抱歉，无法获取用户数据，请在企业微信中打开')

                } else if (data == ' 500') {
                    alert('系统错误，服务器异常，请稍后重试,')

                } else {
                    //装载每个user info数据
                    for (var i in response['data']) {
                        MyData.userInfo[i] = response['data'][i];
                    }
                    //初始化timestamp数据
                    MyData.overallData['timestamp'] = MyData.userInfo['userid'] + '_' + (new Date()).valueOf();

                    //初始化用户id
                    MyData.wxuserid=MyData.userInfo['userid'];

                    //装载userInfo数据到cookies
                    Cookies.set('userInfo', data, {expires: 7});
                    //获取用户朋友圈的信息
                    getUserFriendInfoToPhoneData();
                }
            }
        }, function errorCallback(err) {
            alert("尊敬的客户，服务器异常，请稍后重试.,")
        });
    };

    /**
     * 获取指定范围内的新闻List数据
     */
    var getUserFriendInfoToPhoneData = function () {
        //标识正在加载数据
        MyData.overallData['markLoadingNews'] = true;
        //装载表单数据
        var fd = new FormData();
        //设置新闻类型
        fd.append('type', MyData.FRIEND_CIRCLE_TYPE);
        //设置用户的user_id
        fd.append('wx_user_id', MyData.wxuserid);
        //设置从某id字段开始查找news数据
        if (MyData.newsList.length <= 0) {
            fd.append('create_time', MyData.maxNum);

        } else {
            var lastIndex = MyData.newsList[MyData.newsList.length - 1]['create_time'];
            fd.append('create_time', lastIndex);
        }
        //http请求数据
        $http.post(MyData.getUserFriendInfoToPhone, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }).success(function (response) {
            if (response['status_code'] == 200) {
                //正常返回数据，则进行填充操作
                for (var i in response['data']) {
                    //展示数据转换
                    response['data'][i]['url'] = MyData.coverImgBaseUrl + response['data'][i]['timestamp'] + ".png";
                    response['data'][i]['time'] = MyGeneralSer.generateShowTime(response['data'][i]['create_time']);
                    //展示数据填充
                    switch (response['data'][i]['status_cd']) {
                        case 0:
                            response['data'][i]['status_name']='草稿';
                            break;
                        case 1:
                            response['data'][i]['status_name']='待审';
                            break;
                        case 2:
                            response['data'][i]['status_name']='待审';
                            break;
                        case 3:
                            response['data'][i]['status_name']='通过';
                            break;
                        case 4:
                            response['data'][i]['status_name']='驳回';
                            break;
                        default:
                            response['data'][i]['status_name']='草稿!';
                            break;
                    }
                    MyData.newsList.push(response['data'][i]);
                }

            } else {
                alert("尊敬的客户，服务器异常，请稍后重试..")
            }
        }).error(function (err) {
            alert("尊敬的客户，服务器异常，请稍后重试...")

        }).finally(function () {
            //标识加载数据完成
            MyData.overallData['markLoadingNews'] = false;
        })
    };

    /**
     * 重置数据顺序：
     *  1、根据置顶标签排在前面，
     *  2、置顶的数据中根据置顶时间戳进行排序
     */
    var sortStickNum = function (a, b) {
        if (a['stick_cd'] == 1 && b['stick_cd'] == 1) {
            //若两者均为置顶状态，则比较置顶时间
            return b['stick_time'] - a['stick_time']

        } else if (b['stick_cd'] != a['stick_cd']) {
            //若两者置顶数据不一样，则置顶作为比较条件
            return b['stick_cd'] - a['stick_cd'];

        } else {
            //无置顶要求数据根据创建时间进行排列
            return new Date(b['create_time']) - new Date(a['create_time']);
        }
    };

    /**
     * 搜索新闻数据
     */
    var searchNews = function () {
        var url = MyData.searchUserNews;
        var sendData = {
            'type': MyData.FRIEND_CIRCLE_TYPE,
            'wx_user_id': MyData.wxuserid, //搜索特定个人的记录
            'search': MyData.overallData['search'], //搜索内容
        };
        MyGeneralSer.httpPostData(url, sendData, function (data) {
            //清空之前新闻数据
            MyData.newsList.length = 0;

            //对返回的新闻数据进行排序
            var newListSortedData = data.sort(sortStickNum);

            //正常返回数据，则进行填充操作
            for (var i in newListSortedData) {
                //展示数据转换
                newListSortedData[i]['url'] = MyData.coverImgBaseUrl + newListSortedData[i]['timestamp'] + ".png";
                newListSortedData[i]['time'] = MyGeneralSer.generateShowTime(newListSortedData[i]['create_time']);

                //展示数据填充
                switch (newListSortedData[i]['status_cd']) {
                    case 0:
                        newListSortedData[i]['status_name']='草稿';
                        break;
                    case 1:
                        newListSortedData[i]['status_name']='待审';
                        break;
                    case 2:
                        newListSortedData[i]['status_name']='待审';
                        break;
                    case 3:
                        newListSortedData[i]['status_name']='通过';
                        break;
                    case 4:
                        newListSortedData[i]['status_name']='驳回';
                        break;
                    default:
                        newListSortedData[i]['status_name']='草稿!';
                        break;
                }

                //展示数据填充
                MyData.newsList.push(newListSortedData[i]);
            }
        })
    };


    return {
        getUserFriendInfoToPhoneData: getUserFriendInfoToPhoneData,
        searchNews: searchNews,
        initData: initData,
    }
});