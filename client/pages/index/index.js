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
        var loginUrl=config.service.loginUrl+this.data.identity
        var redirectUrl = "/pages/" + this.data.identity + "/" + this.data.identity
        console.log(redirectUrl)
        qcloud.request({
            url: loginUrl,
            login: true,
            success(result) {
                util.showSuccess('登录成功')
                getApp().globalData.userInfo=result.data.data
                if(result.data.isNewShopkeeper){
                    redirectUrl="/pages/keeperRegist/keeperRegist"
                }
                wx.navigateTo({
                    url: redirectUrl //实际路径要写全
                })
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
    onHide:function(){
        this.setData({
            userDisable:false,
            userLoading:false,
            shopkeeperDisable:false,
            shopkeeperLoading:false,
        })

    }

})