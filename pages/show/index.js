
const App = getApp()
const { baseURL } = App.$config

Page({
  data: {
    todo: {},
    is_edit: false,
    todo_val: ''
  },
  onLoad(option) {
    const self = this
    const { id } = option
    wx.request({
      url: `${baseURL}/todos/${id}`,
      method: 'GET',
      success(res) {
        self.setData({
          todo: res.data.data,
          todo_val: res.data.data.content
        })
      }
    })
  },
  onChange(e) {
    this.setData({
      todo_val: e.detail.value
    })
  },
  editTodo(e) {
    const self = this
    if (this.data.is_edit) {
      const val = this.data.todo_val
      const id = e.currentTarget.dataset.id

      wx.request({
        url: `${baseURL}/todos/${id}`,
        method: 'POST',
        data: {
          content: val
        },
        success(res) {
          wx.request({
            url: `${baseURL}/todos/${id}`,
            method: 'GET',
            success(res) {
              self.setData({
                todo: res.data.data,
                todo_val: res.data.data.content
              })
            }
          })
          self.setData({
            is_edit: false
          })
        }
      })
    } else {
      this.setData({
        is_edit: true
      })
    }
  }
})
