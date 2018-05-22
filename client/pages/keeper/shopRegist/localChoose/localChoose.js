// pages/keeper/shopRegist/shopRegist.js
//http://lbs.qq.com/qqmap_wx_jssdk  腾讯地图小程序api文档
var QQMapWX = require('../../../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:null,
    address:null,
    longitude:null,
    marker:[],
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
            var marker=[{
              iconPath:"/img/location-sign.png",
              id: 0,
              latitude: latitude,
              longitude: longitude,
              width: 5,
              height: 5
            }]
            //重新选点的时候显示出原来选择的地点
            var shopLocation=getApp().globalData.shopLocation
            if (shopLocation&&shopLocation.address){
              console.log(shopLocation)
              latitude=shopLocation.latitude
              longitude=shopLocation.longitude
              address=shopLocation.address
              marker[0]['latitude']=latitude
              marker[0]['longitude']=longitude
            }
            //重新选点的时候显示出原来选择的地点
            that.setData({
              'longitude':longitude,
              'latitude':latitude,
              'address':address,
              'marker':marker
            })
          }
        })
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
    var marker=this.data.marker
    marker[0]['latitude']=event.currentTarget.dataset.latitude
    marker[0]['longitude']=event.currentTarget.dataset.longitude
    this.setData({
      "address":event.currentTarget.dataset.title,
      "longitude":event.currentTarget.dataset.longitude,
      "latitude":event.currentTarget.dataset.latitude,
      "marker":marker,
      "suggestions":null
    })
    
  },
  confirm:function(event){
    var shopLocation={
      "longitude":this.data.longitude,
      "latitude":this.data.latitude,
      "address": this.data.address
    }
    getApp().globalData.shopLocation=shopLocation
    wx.navigateBack()
  }
})