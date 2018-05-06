//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    console.log(result)
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    
                }
            },
            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    }
})