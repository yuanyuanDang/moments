
const App = getApp()

Page({
  data: {
    userInfo: null
  },
  selector(e) {
    console.log(e)
  },
  getphonenumber(e) {
    console.log(e)
  },
  getUserInfo(e) {
    const self = this
    App.globalData.userInfo = e.detail.userInfo
    /*self.setData({
      userInfo: e.detail.userInfo
    })*/
    // console.log(e.detail.userInfo)
  },
  onLoad() {
    const self = this
    wx.getUserInfo({
      success: function(res) {
        App.globalData.userInfo = res.userInfo
        self.setData({
          userInfo: App.globalData.userInfo
        })
      }
    })

    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        // const latitude = res.latitude
        // const longitude = res.longitude
        // const speed = res.speed
        // const accuracy = res.accuracy
      }
    })

    wx.login({
      success(res) {
        console.log(res.code)
        wx.request({
          url: 'http://localhost:3000/wechat-login',
          data: res.code,
          method: 'GET',
          success(r) {
            console.log(r)
          }
        })
      }
    })
  }
})
