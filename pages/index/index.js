//index.js
var bmap = require('../../utils/bmap-wx.min.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    curLocation: null, //当前位置
    gotLocation: null, //选取的位置
    courtList: [], //球场列表
  },
  onReady: function () {
    this.mapCtx = wx.createMapContext("map");
  },
  //事件处理函数
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });

      //获取当前位置
      var BMap = new bmap.BMapWX({
        ak: 'GuFYy4kCQk8vxaha6bt86Xnk0DD8kwSp'
      });

      var getLocationFail = function (data) {
        console.log(data);
      };
      var getLocationSuccess = function (data) {
        //返回数据内，已经包含经纬度  
        console.log(data);
        //使用wxMarkerData获取数据  
        var curLoc = data.wxMarkerData[0];
        curLoc = {
          address: curLoc.address,
          latitude: curLoc.latitude,
          longitude: curLoc.longitude
        }
        var locList = [];
        var otherPois = data.originalData.result.pois;
        for (var index = 0, count = otherPois.length; index < count; index++) {
          locList.push({
            id: index,
            title: otherPois[index].addr,
            latitude: otherPois[index].point.y,
            longitude: otherPois[index].point.x,
            iconPath: "/resource/images/water_16.png"
          });
        }

        //把所有数据放在初始化data内  
        that.setData({
          curLocation: curLoc,
          courtList: locList
        });
      }
      // 发起regeocoding检索请求   
      BMap.regeocoding({
        fail: getLocationFail,
        success: getLocationSuccess,
        pois: 1
      });
    });
  },
  mapTap: function (e) {
    console.log(e);
    this.mapCtx.moveToLocation();
  },
  mapRegionChange: function (e) {
    if(e.type=='end'){
      var loc=this.mapCtx.getCenterLocation({
        success:function(loc){
          console.log(loc);
        }
        
      
      });
      console.log(loc);
    }
    console.log(e);
  }
})
