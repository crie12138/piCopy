// pages/keeper/keeper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onclick:function(event){
    var navigateUrl=event.currentTarget.dataset.action+"/"+event.currentTarget.dataset.action
    wx.navigateTo({
      url:navigateUrl
    })

  }
})