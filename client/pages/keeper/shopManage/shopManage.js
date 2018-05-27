// pages/keeper/shopManage/shopManage.js
var config=require("../../../config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList()
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
    this.getShopList()
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

  addShop:function(event){
    wx.navigateTo({
      url:"shopRegist/shopRegist"
    })
  },

  chooseShop:function(event){
    var shopId = event.currentTarget.dataset.shopid
    var url="shop/shop?shopId="+shopId
    wx.navigateTo({
      url:url
    })
  },

  getShopList:function(){
    var url=config.service.shopUrl+"getShopList/"+getApp().globalData.userInfo.openId
    var that=this
    wx.request({
      url:url,
      success:function(res){
        that.setData({
          'shops':res.data.row
        })
      }
    })
  }
})