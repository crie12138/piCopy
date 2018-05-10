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
                }
            },
            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },
    globalData:{
        userInfo:null
    }
})