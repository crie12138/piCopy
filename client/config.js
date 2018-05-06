/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://7okomkrt.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login/`,

        appUrl: `${host}/weapp/`,

        // 用户地址，用于发起用户请求
        userUrl: `${host}/weapp/user/`,

        // 商家地址，用于发起商家请求
        shopkeeperUrl:`${host}/weapp/shopkeeper/`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel/`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload/`
    }
};

module.exports = config;