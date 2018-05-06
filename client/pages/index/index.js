//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page( {
    data: {
        identity:null,
        userLoading:false,
        shopkeeperLoading:false,
        userDisable:false,
        shopkeeperDisable:false,
        takeSession:true
    },
    login:function(){
        util.showBusy('正在登录')
        var that = this
        // 调用登录接口
        var url=config.service.loginUrl+this.data.identity
        console.log(url)
        qcloud.request({
            url: url,
            login: true,
            success(result) {
                util.showSuccess('登录成功')
                console.log(result)
            },
            fail(error) {
                util.showModel('请求失败', error)
                console.log('request fail', error)
            }
        })
    },
    onclick:function(event){
        this.setData({
            identity:event.currentTarget.dataset.identity,
        }) 
        if (this.data.identity=="user"){
            this.setData({
                userLoading:true,
                shopkeeperDisable:true
            })
        }
        else
        {
            this.setData({
                userDisable:true,
                shopkeeperLoading:true
            })
        }
        this.login()
        
    },

})