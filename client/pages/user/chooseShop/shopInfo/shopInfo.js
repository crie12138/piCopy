// pages/user/chooseShop/shopInfo/shopInfo.js
var config=require("../../../../config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var shopId=options.shopId
    var url=config.service.userUrl+"getShopInfo/"+shopId
    console.log(url)
    wx.request({
      url:url,
      success:function(result){
        that.setData({
          'shopInfo':result.data.shopInfo
        })
      }
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

  sendFile:function(event){
    var url=config.service.userUrl+"registToken"
    var shopId=this.data.shopInfo.id
    var openId=getApp().globalData.userInfo.openId
    wx.scanCode({
      onlyFromCamera:true,
      success:function(res){
        var token =res.result
        wx.request({
          url:url,
          data:{
            "token":token,
            "shopId":shopId,
            "openId":openId
          },
          method:"POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(result){
            if (result.data.code==0){
              wx.navigateTo({
                url:"fileConfirm/fileConfirm?token="+token
              })
            }
          }
        })
      }
    })
  }
})