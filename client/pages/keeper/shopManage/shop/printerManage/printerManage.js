// pages/keeper/shopManage/shop/printerManage/printerManage.js
var config=require("../../../../../config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId:null,
    printers:null,
    active:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopId=options.shopId
    this.setData({
      'shopId':shopId
    })
    this.getPrinters(shopId)

  
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

  getPrinters:function(shopId){
    var that=this
    wx.request({
      url:config.service.shopUrl+"getPrinter/"+shopId,
      success:function(result){
        that.setData({
          'printers':result.data.data
        })
        console.log(result.data.data)
      }
    })
  },

  addPrint:function(){
    var that=this
    var shopId=this.data.shopId
    wx.scanCode({
      onlyFromCamera:true,
      success:function(res){
        console.log(res.result)
        var token=res.result
        wx.request({
          url:config.service.shopUrl+"addPrinter",
          data:{
            "token":token,
            "shopId":shopId
          },
          method:"POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            if(res.data.code==0){
              that.getPrinters(shopId)
            }
            else{
              wx.showToast({
                title: '注册失败',
                image: "/img/error.png",
              })
            }
          }
        })
      }
    })
  },
  
  deletePrint:function(event){
    var printId=event.currentTarget.dataset.printid
    var url=config.service.shopUrl+"deletPrint/"+printId
    var shopId=this.data.shopId
    var that=this
    wx.request({
      url:url,
      success:function(res){
        if(res.data.code==0){
          that.getPrinters(shopId)
        }
        else{
          wx.showToast({
            title: '操作失败',
            image: "/img/error.png",
          })
        }
      }
    })

  },
  showOptions:function(event){
    var printId=event.currentTarget.dataset.printid
    console.log(printId)
    this.setData({
      'active':printId
    })
  }
})