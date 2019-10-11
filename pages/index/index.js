
const app = getApp()

Page({
  data: {
    text: '123456',
    list: [
      {
        id: '12345678',
        is_zan: 0,
        zan_num: 123,
      },
      {
        id: '09876545678',
        is_zan: 1,
        zan_num: 3456,
      },
      {
        id: '345676543',
        is_zan: 0,
        zan_num: 679,
      },
    ],
    person: {
      age: 18
    },
  },
  dianzan(e) {
    const { id } = e.target.dataset
    console.log(id)
    // wx.request
    this.data.list.forEach((item, index) => {
      if (item.id === id) {
        if (!item.is_zan) {
          this.setData({
            [`list[${index}].zan_num`]: item.zan_num + 1,
            [`list[${index}].is_zan`]: 1,
          })

          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          this.setData({
            [`list[${index}].zan_num`]: item.zan_num - 1,
            [`list[${index}].is_zan`]: 0,
          })

          wx.showToast({
            title: '取消赞',
            icon: 'success',
            duration: 2000
          })
        }


        console.log(index)
        console.log(item)
      }
    })
  },
  plus(e, r) {
    const { index } = e.target.dataset
    // console.log(this.data)
    // console.log(this.data.list[index])
    // this.data.list[index] = this.data.list[index] + 1
    // const item = `list[${index}]`
    // console.log(r)



    /*this.setData({
      [item]: this.data.list[index] + 1
    })*/

    /*this.setData({
      // 'list[0]': 123
      [`list[${index}]`]: '123',
      // [`list[${index}]`]: '123',
      'person.age': 40,
      text: 'asdfghjklsdfghjkzxcvbnmsdfghj'
    })
    console.log(this.data.list)
    console.log(this.data.person)
    console.log(this.data.text)*/
  },
  onShow() {

  },
  linkTo() {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },
  chooseImage(e) {

    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })

    /*wx.chooseLocation({
      success(res) {
        console.log(res)
      }
    })*/

    /*wx.showActionSheet({
      itemList: ['相机', '相册', '取消'],
      success (res) {
        switch (res.tapIndex) {
          case 0:
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['camera'],
              success (res) {
                console.log(res)
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
              }
            })
            break
          case 1:
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['album'],
              success (res) {
                console.log(res)
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
              }
            })
            break
          case 2:
            break
        }

        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })*/


    /*wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })*/
  }
})
