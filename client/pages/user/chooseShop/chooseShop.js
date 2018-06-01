// pages/user/chooseShop/chooseShop.js
var Bmap = require('../../../bmap-wx.js')
var config=require('../../../config')
var bmap =new Bmap.BMapWX({
  ak:'18q8dG0hhApDZCVuG4SiPVQPywoLgWK4'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    location:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var url=config.service.userUrl+"getShops"
    var markers=[]
    console.log(url)
    //通过百度地图定位找出用户的所在地
    bmap.regeocoding({
      'iconPath':'/img/location-sign.png',
      success:function(res){
      //从服务器获取所有打印机所在的点并且放入shops的数组里作为地图的markers
        wx.request({
          url:url,
          success:function(result){
            markers[0]=res.wxMarkerData[0]
            for(var i=0,len=result.data.shops.length;i<len;i++){
            
            var marker={ 
              'id':result.data.shops[i].id,
              'label':{
                'content':result.data.shops[i].page_price,
                'bgcolor':"yellow",
                'color':"black",
                'textAlign':'center',
              },
              'latitude':result.data.shops[i].latitude,
              'longitude':result.data.shops[i].longitude,
              'iconPath':'/img/marker_red.png'
              }
                markers[i+1]=marker
            }
            console.log(markers)
            that.setData({
              'location':markers[0],
              'markers':markers
            })
          },
          fail:function(result){
            wx.showToast
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
  getShop:function(event){
    var url='shopInfo/shopInfo?shopId='+event.detail.markerId
    wx.navigateTo({
      url:url
    })

  }
})