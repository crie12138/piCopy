var bmap = require('lib/bmap-wx.js');
Page({
  data: {
    sugData: ''
  },
  haha: function (e) {
    var that = this;
    if (e.detail.value === '') {
      that.setData({
        sugData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: 'P79PWaIThzIFNrg5RiylhZbnQvSCTGrK'
    });
    var fail = function (data) {
      console.log(data)
    }; 
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: function (data) {
        console.log(data)
        var sugData = '';
        for (var i = 0; i < data.result.length; i++) {
          sugData = sugData + data.result[i].name + '\n';
        }
        that.setData({
          sugData: sugData
        });
      }
    });
  }
})