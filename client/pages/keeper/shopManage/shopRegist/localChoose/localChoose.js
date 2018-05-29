// pages/keeper/shopRegist/shopRegist.js
var QQMapWX = require('../../../../../qqmap-wx-jssdk.js');
var Bmap = require('../../../../../bmap-wx.js')
var bmap =new Bmap.BMapWX({
  ak:'18q8dG0hhApDZCVuG4SiPVQPywoLgWK4'
})
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    latitude:null,
    address:null,
    placehold:null,
    longitude:null,
    marker:[],
    suggestions:[],
    inputvalue:null,
    height:"70vh",
    width:"100%"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var latitude
    var longitude
    var address
    var that=this
    var wxMarkerData = []
    //1、获取当前位置坐标
        bmap.regeocoding({
          iconPath:"img/location-sign.png",
          success:function(res){
            wxMarkerData = res.wxMarkerData
            latitude=wxMarkerData[0]['latitude']
            longitude=wxMarkerData[0]['longitude']
            address=wxMarkerData[0]['address']
            //console.log(wxMarkerData)
            that.setData({
              'marker': wxMarkerData,
              'latitude':latitude,
              'longitude':longitude,
              'placehold':address
            });
            //console.log(that.data.marker)
          }
        })
  },

  /** * 生命周期函数--监听页面初次渲染完成 */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
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
  addressInput : function(event){
    var address=event.detail.value 
    var that=this
    console.log(address)
    bmap.suggestion({
        query:address,
        success:function(res){
          that.setData({
            "suggestions":res.result,
            "height": "50vh",
            "width": "100%"
          })
          console.log(res)
        },
        fail:function(res){
          console.log(res)
        }
    })

  },
  useSuggestion:function(event){
    var name = event.currentTarget.dataset.name
    var marker=this.data.marker
    var lat = event.currentTarget.dataset.lat
    var lng = event.currentTarget.dataset.lng
    marker[0]['latitude']=lat
    marker[0]['longitude']=lng
    this.setData({
      "address":name,
      "longitude":lng,
      "latitude": lat,
      "marker":marker,
      "suggestions":null,
      "height": "70vh",
      "width": "100%"
    })
    
  },
  confirm:function(event){
    if(this.data.address==null){
      var shopLocation={
        "longitude":this.data.longitude,
        "latitude":this.data.latitude,
        "address": this.data.placehold
      }
    }else{
      var shopLocation={
        "longitude":this.data.longitude,
        "latitude":this.data.latitude,
        "address": this.data.address
      }
    }
      
    getApp().globalData.shopLocation=shopLocation
    wx.navigateBack()
  }
})