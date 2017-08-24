// court.js

var bmap = require('../../utils/bmap-wx.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curLocation: null,
    locationList: []
  },

  onLocationChange: function (e) {
    //this.setData({curLocation:e.detail.value});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'GuFYy4kCQk8vxaha6bt86Xnk0DD8kwSp'
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      var curLoc = data.wxMarkerData[0];
      curLoc = {
        address: curLoc.address,
        latitude: curLoc.latitude,
        longitude: curLoc.longitude
      }
      //把所有数据放在初始化data内  
      //that.setData({
       // curLocation: curLoc,
     // });

      that.mapCtx.moveToLocation();
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext("map");
  },

  mapTap: function (e) {
    console.log(e);
    this.mapCtx.moveToLocation();
  },
  mapRegionChange: function (e) {
    var that = this;
    if (e.type == 'end') {
      var loc = this.mapCtx.getCenterLocation({
        success: function (loc) {
          console.log(loc);
          curLoc = {
            address: loc.address,
            latitude: loc.latitude,
            longitude: loc.longitude
          }
        }


      });
      console.log(loc);
    }
    console.log(e);
  }
})