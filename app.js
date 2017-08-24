//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (loginCode) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });

          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx31bb3803b7f960c4&secret=189aa48d5eb44d45b3bb277a4603267e&grant_type=authorization_code&js_code=' + loginCode.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              that.globalData.userCode = res.data.openid;
            } 
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userCode:null
  }
})