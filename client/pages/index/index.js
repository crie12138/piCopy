//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var pageObject = {
    data: {
        userLoading:false,
        shopkeeperLoading:false,
        userDisable:false,
        shopkeeperDisable:false,
    },
    onclick:function(event){
        var identity=event.currentTarget.dataset.identity
        console.log(identity)
        if (identity=="user"){
            this.setData({
                userLoading:true,
                shopkeeperDisable:true
            })
        }
        else
        {
            this.setData({
                userDisable:true,
                shopkeeperLoading:true
            })
        }
        
    },
  }


Page(pageObject)