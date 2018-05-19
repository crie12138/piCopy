// pages/keeper/shopRegist/shopRegist.js
var config =require("../../../config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoPath:null,
    shopName:null,
    price:null,
    shopLocation:null,
    imgUrl:null,
    inputResult:"inputView"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.setData({
      "shopLocation":getApp().globalData.shopLocation
    })
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
  localChoose:function(){
    wx.navigateTo({
      url:"localChoose/localChoose"
    })
  },
  doUpload:function(){
    var that = this
    // 选择图片
    wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res){
            var filePath = res.tempFilePaths[0]
            that.setData({
              "imgUrl":filePath
            })
            console.log(filePath)
        },
        fail: function(e) {
            console.error(e)
        }
    })
    
  },
  priceInput:function(event){
    var reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/;
    var result
    var price=event.detail.value
    if(reg.test(price)){
      result="inputCorrect"
    }
    else if(price==0){
      result="inputView"
    }
    else{
      result="inputMismatch"
      price=0
    }
    this.setData({
      "inputResult":result,
      "price":price
    })
    console.log(event.detail.value)
    
  },
  confirm:function(){
    var that=this
    wx.uploadFile({
      url:config.keeperUrl+"shopRegist",
      filePath:imgUrl,
      formData:{
        "Location":that.data.Location,
      }
    })
  }
})