// pages/keeperRegist/keeperRegist.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:null,
    openId:null,
    nickName:null,
    captcha:null,
    realName:null,
    phone:null,
    result:"inputView",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keeperInfo=getApp().globalData.userInfo
    this.setData({
        avatarUrl:keeperInfo["avatarUrl"],
        nickName:keeperInfo["nickName"],
        openId:keeperInfo["openId"]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  realNameInput:function(event){
    console.log(event.detail.value=='')
    this.setData({
      'realName':event.detail.value
    })
  },
  phoneInput:function(event){
    var phone = event.detail.value
    var result="inputMismatch"
    if(/^1[34578]\d{9}$/.test(phone)){ 
      result="inputCorrect"
    } 
    else if(phone==0){
      result="inputView"
    }
    else{
      phone=phone
    }
    this.setData({
      'phone':phone,
      'result':result
    })
    
  },
  captchaInput:function(event){
    console.log(event.detail.value)
    this.setData({
      captcha:event.detail.value
    })
  },
  getCaptcha:function(){

  },
  
  formSubmit:function(e){
    var realName = this.data.realName
    var phone = this.data.phone
    var openId = this.data.openId
    var url = config.service.keeperUrl + "regist"
    if (this.data.realName == "" || this.data.realName == null || this.data.phone == null){
      wx.showToast({
        title: '输入不能为空',
        image:'/pages/keeper/image/error.png',
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    } else if (this.data.result == "inputMismatch"){
      wx.showToast({
        title: '手机号格式错误',
        image: '/pages/keeper/image/error.png',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else{
      wx.request({
        url: url,
        data: {
          "realName": realName,
          "phone": phone,
          "openId": openId,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          console.log(result)
          if (result.data.code == 0) {
            wx.redirectTo({
              url: "/pages/keeper/keeper"
            })
          }
          else {
            util.showModel("注册失败", result.data.data)
          }
        },
      })
    }
  }
})
