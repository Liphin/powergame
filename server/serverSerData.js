/**
 * Created by Administrator on 2018/5/15.
 */
/**服务器的测试环境和生产环境配置****************************************************************************/
var projectPath, port, basePath, isProd;
if (global.env == 'dev') {
        basePath = "E:\\work_program\\wxgame_lh";
    projectPath = basePath + "\\powergameFront"; //项目根文件目录
    port = 3030; //本地port
    isProd = false;

} else if(global.env == 'pengSer' ){
    basePath = "D:\\projects\\powergame\\front";
    projectPath = basePath + "\\output"; //远程项目根文件目录
    port = 3030;
    isProd = true;

} else {
    basePath = "/root/powergame/front";
    projectPath = basePath + "/output"; //远程项目根文件目录
    port = 3030;
    isProd = true;
}
var httpDataLimit = '25mb';

//自建应用的agentId和secret TODO
var instanceMapper = {
   //用于获取关注用户信息数据接口
    1: {'appid': 'wxf52fc57535c3d13b', 'secret': '47f0bc5a4e0678d7dcee33115a6de819','redirect_uri': 'http://powergame.liphin.com:3030/getWxUserInfo', 'scope' : 'snsapi_userinfo','code':'','access_token':'', 'timestamp':0, 'js_api_ticket':'', 'js_api_timestamp':0},
};

var userWxInfo = {
    'openid':'',
}

module.exports = {
    //服务器配置
    port: port,
    isProd: isProd,
    basePath: basePath,
    projectPath: projectPath,
    httpDataLimit: httpDataLimit,
    instanceMapper: instanceMapper,
    userWxInfo: userWxInfo,

}