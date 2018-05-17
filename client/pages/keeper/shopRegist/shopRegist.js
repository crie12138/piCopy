// pages/keeper/shopRegist/shopRegist.js
//http://lbs.qq.com/qqmap_wx_jssdk  腾讯地图小程序api文档
var QQMapWX = require('../../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:null,
    address:null,
    longitude:null,
    markers:null,
    suggestions:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'KAKBZ-WCBKG-WATQG-IVKYT-46Q42-VJBNC' // 必填
    });
    var latitude
    var longitude
    var that=this
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        latitude=res.latitude
        longitude=res.longitude
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            var markers=[{
              iconPath:"/img/location-sign.png",
              id: 0,
              latitude: latitude,
              longitude: longitude,
              width: 10,
              height: 10
            }]
            that.setData({
              'longitude':longitude,
              'latitude':latitude,
              'address':address,
              'markers':markers
            })
          }
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
  addressInput:function(event){
     var address=event.detail.value 
     var that=this
     console.log(address)
     qqmapsdk.getSuggestion({
        keyword:address,
        success: function(res) {
          that.setData({
            'suggestions':res.data
          })  
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          console.log(that.data.suggestions)
        }
     })

  },
  useSuggestion:function(event){
    console.log(event.currentTarget.dataset.latitude)
    console.log(event.currentTarget.dataset.longitude)

  }
})