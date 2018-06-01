// pages/keeper/shopRegist/shopRegist.js
var config =require("../../../../config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName:null,
    price:null,
    shopLocation:null,
    imgUrl:["pic.png"],
    flag:true,
    nameFlag:true,
    priceFlag:true

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
    console.log(this.data.shopLocation)
    //当页面从隐藏到下一次打开是获取全局变量看是否选好了商店地址
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

  isBlank:function(str){
    if(Object.prototype.toString.call(str) === '[object Undefined]') {//空
      return true
    } else if (
      Object.prototype.toString.call(str) === '[object String]' ||
        Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
      return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
      return JSON.stringify(str) == '{}' ? true : false
    }else{
      return true
    }

  },

  shopNameInput:function(event){
    var name=event.detail.value
    if(2<name.length&&name.length<20){
        this.setData({
        "shopName":event.detail.value,
        "nameFlag":true
      })
    }
    else{
      this.setData({
        "shopName":null,
        "nameFlag":false
      })
    }
    console.log(this.data.nameFlag)
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
              "imgUrl[0]":filePath,
              "flag":false

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
    var pFlag
    var price=event.detail.value
    if(reg.test(price)){
      pFlag=true
    }
    else{
      pFlag=false
      price=0
    }
    this.setData({
      "price":price,
      "priceFlag":pFlag
    })
    
  },
  previewImage: function (e) {
    wx.previewImage({
      
      urls: this.data.imgUrl // 需要预览的图片http链接列表
    })
  },
  

  confirm:function(){
    console.log(getApp().globalData.userInfo.openId)
    var that=this
    var url=config.service.shopUrl+"shopRegist"
    var imgUrl=this.data.imgUrl[0]
    console.log(imgUrl)
    if (!(this.isBlank(config.service.keeperUrl) || this.isBlank(imgUrl[0]) || this.isBlank(that.data.shopLocation) 
    || this.isBlank(that.data.shopLocation['address']) || this.isBlank(that.data.shopName)
    || this.isBlank(that.data.price))) {
      wx.showToast({
        title: '提交申请',
        icon:"loading",
      })
      wx.uploadFile({
        url: url,
        filePath: imgUrl,
        name: 'file',

        formData: {
          "openId": getApp().globalData.userInfo.openId,
          "address": that.data.shopLocation['address'],
          'longitude': that.data.shopLocation['longitude'],
          'latitude': that.data.shopLocation['latitude'],
          "shopName": that.data.shopName,
          "price": that.data.price,
        },
        success: function (res) {
          console.log(res.data)
          var code=res.data.slice(-2,-1)
          console.log(code)
          if(code=="0"){
            wx.showToast({
              title: '注册成功',
              icon:"success",
            })
            wx.navigateBack()
          }
          else{
            wx.showToast({
              title: '注册失败',
              image: "/img/error.png",
            })
          }
        },

        fail: function (e) {
          console.log(e)
        }
      })
    } else {
      wx.showToast({
        title: '请填写全部信息',
        image: "/img/error.png",
      })
    }
  }
})