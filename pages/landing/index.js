
const App = getApp()

const { baseURL } = App.$config

Page({
  data: {
    todos: [],
    todo_val: '',
    timer: 0,
    lock: false
  },
  onShow() {
    const self = this
    wx.request({
      url: `${baseURL}/todos`,
      method: 'GET',
      success(res) {
        const { data } = res.data
        data.map(item => {
          return item.lock = true
        })

        self.setData({
          todos: data
        })
      }
    })
  },
  onChange(e) {
    const self = this
    self.setData({
      todo_val: e.detail.value
    })
  },
  submitTodo() {
    const self = this
    const val = self.data.todo_val

    if (val) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${baseURL}/todos`,
        method: 'POST',
        data: {
          content: val
        },
        success(res) {
          wx.hideLoading()
          self.setData({
            todo_val: ''
          })

          wx.request({
            url: `${baseURL}/todos`,
            method: 'GET',
            success(res) {
              const { data } = res.data
              self.setData({
                todos: data
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  tap: function(e) {
    //检查锁
    if (this.data.lock) {
      return;
    }

    const self = this
    const { id } = e.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
      url: `/pages/show/index?id=${id}`
    })
    console.log('触发了 tap')
  },
  longtap: function (e) {
    //锁住
    this.setData({lock: true});

    const self = this
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: `${baseURL}/todos/${id}/delete`,
            method: 'POST',
            success(res) {
              wx.request({
                url: `${baseURL}/todos`,
                method: 'GET',
                success(res) {
                  const { data } = res.data
                  self.setData({
                    todos: data
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  touchend: function() {
    if (this.data.lock) {
      //开锁
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  }
})
