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
    console.log(event.detail.value)
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
    else{
      phone=null
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
  confirm:function(event){
    var realName=this.data.realName
    var phone=this.data.phone
    var openId=this.data.openId
    var url=config.service.keeperUrl+"regist"
    console.log(realName,phone)
    wx.request({
      url:url,
      data:{
          "realName":realName,
          "phone":phone,
          "openId":openId,
      },
      method:"post",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(result){
        console.log(result)
        if(result.data.code==0){
          wx.redirectTo({
            url:"/pages/keeper/keeper"
          })
        }
        else{
          util.showModel("注册失败",result.data.data)
        }
      },
    })
  }

})