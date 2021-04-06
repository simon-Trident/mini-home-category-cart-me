// app.js
App({
  onLaunch() {

    const system = wx.getSystemInfoSync()
    
    const getPlatform = () => {
      if (system.model && system.model.indexOf('iPhone') >= 0) {
        return 'iphone'
      } else if (system.model && system.model.indexOf('iPad') >= 0) {
        return 'ipad'
      } else {
        return 'android'
      }
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹窗
          wx.getUserProfile({
            success: res => {
              this.globalData.userProfile = res.userProfile

              // 由于getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userProfileReadyCallback) {
                this.userProfileReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})
