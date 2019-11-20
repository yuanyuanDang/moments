
import config from './config'

App({
  onLaunch: function () {
    wx.login({
      success(res) {
        console.log(res.code)
        wx.request({
          url: 'http://localhost:3000/wechat-login',
          data: {
            code: res.code
          },
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },
  $config: {
    baseURL: config.env === 'dev'
      ? 'http://localhost:3000/api/v1'
      : 'https://koo-todolist.leanapp.cn/api/v1',
  },
  globalData: {
    userInfo: null
  }
})