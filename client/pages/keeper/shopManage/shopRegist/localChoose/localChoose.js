// pages/keeper/shopRegist/shopRegist.js
//http://lbs.qq.com/qqmap_wx_jssdk  腾讯地图小程序api文档
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
    latitude:null,
    address:null,
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
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'KAKBZ-WCBKG-WATQG-IVKYT-46Q42-VJBNC' // 必填
    });
    var latitude
    var longitude
    var that=this
    var wxMarkerData = []
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        latitude=res.latitude
        longitude=res.longitude
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        // qqmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (addressRes) {
        //     var address = addressRes.result.formatted_addresses.recommend;
        //     var marker=[{
        //       iconPath:"/img/location-sign.png",
        //       id: 0,
        //       latitude: latitude,
        //       longitude: longitude,
        //       width: 5,
        //       height: 5
        //     }]
        //     //重新选点的时候显示出原来选择的地点
        //     var shopLocation=getApp().globalData.shopLocation
        //     if (shopLocation&&shopLocation.address){
        //       console.log(shopLocation)
        //       latitude=shopLocation.latitude
        //       longitude=shopLocation.longitude
        //       address=shopLocation.address
        //       marker[0]['latitude']=latitude
        //       marker[0]['longitude']=longitude
        //     }
        //     //重新选点的时候显示出原来选择的地点
        //     that.setData({
        //       'longitude':longitude,
        //       'latitude':latitude,
        //       'address':address,
        //       'marker':marker
        //     })
        //   }
        // })
        bmap.regeocoding({
          iconPath:"/img/location-sign.png",
          success:function(res){
            //console.log(res)
            wxMarkerData = res.wxMarkerData
            //console.log(wxMarkerData)
            that.setData({
              'marker': wxMarkerData
            });
            //console.log(that.data.marker)
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
    // qqmapsdk.getSuggestion({
    //     keyword:address,
    //     success: function(res) {
    //       that.setData({
    //         'suggestions':res.data
    //       })  
    //     },
    //     fail: function(res) {
    //       console.log(res);
    //     },
    //     complete: function(res) {
    //       console.log(that.data.suggestions)
    //     }
    // })
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
      "inputvalue":name,
      "height": "70vh",
      "width": "100%"
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