// pages/user/chooseShop/shopInfo/fileConfirm/fileConfirm.js
var config = require("../../../../../config")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getFile:false,
    filePath:null,
    token:null,
    price:null,
    originName:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var token=options.token
      this.setData({
        'token':token
      })
      while(false)
      wx.showToast({
        title:"正在获取文档"
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


  getFile:function(){
    var that=this
    var url = config.service.userUrl+"fileConfirm/"+this.data.token
    if(this.data.filePath==null){
        wx.request({
        url:url,
        success:function(res){
          console.log(res)
          if(res.data.code==1){
            wx.showToast({
              title:尚未上传文件
            })
            return
          }
          var fileURL = res.data.fileURL
          var price = res.data.price
          var originName = res.data.origin_name
          that.setData({
            'originName':originName,
            'price':price
          })
          wx.downloadFile({
            url:fileURL,
            success:function(result){
              console.log(result)
              that.setData({
                'filePath':result.tempFilePath,
              })
              wx.openDocument({
                filePath:result.tempFilePath
              })
            }
          })
        }
      })
    }else{
      console.log("has")
      wx.openDocument({
        filePath:that.data.filePath
      })
  }
  }
  
})