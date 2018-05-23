// pages/keeper/shopManage/shop/shop.js
var config=require("../../../../config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:null,
    isEdit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url:config.service.shopUrl+"getShop/"+options.shopId,
      success:function(res){
        that.setData({
          'shop':res.data.row
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
  

  submit:function(event){
    console.log(event.detail.value)
  },

  editInfo:function(){
    this.setData({
      "isEdit":true
    })
  }
})