//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page( {
    data: {
        identity:null,
        userLoading:false,
        keeperLoading:false,
        userDisable:false,
        keeperDisable:false,
        takeSession:true
    },
    login:function(){
        util.showBusy('正在登录')
        var that = this
        // 调用登录接口
        var loginUrl=config.service.loginUrl+this.data.identity
        var redirectUrl = "/pages/" + this.data.identity + "/" + this.data.identity
        qcloud.request({
            url: loginUrl,
            login: true,
            success(result) {
                util.showSuccess('登录成功')
                console.log(result)
                getApp().globalData.userInfo=result.data.data
                if(result.data.isNewKeeper){
                    redirectUrl="/pages/keeper/keeperRegist/keeperRegist"
                }
                wx.navigateTo({
                    url: redirectUrl 
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
                keeperDisable:true
            })
        }
        else
        {
            this.setData({
                userDisable:true,
                keeperLoading:true
            })
        }
        this.login()
        
        
    },
    onHide:function(){
        this.setData({
            userDisable:false,
            userLoading:false,
            keeperDisable:false,
            keeperLoading:false,
        })

    }

})