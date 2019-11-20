
const app = getApp()

import qrcode from '../../utils/weapp.qrcode.esm'

Page({
  data: {
    qrcodeVal: '',
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
  onInput(e) {
    // e.detail.value
    this.setData({
      qrcodeVal: e.detail.value
    })
  },
  createQrcode() {
    const val = this.data.qrcodeVal
    qrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: val,
      image: {
        imageResource: '/assets/images/state-thumbs-up.svg',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      }
    })
  },
  createImg() {
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 200,
      height: 200,
      destWidth: 200,
      destHeight: 200,
      canvasId: 'myQrcode',
      success(res) {
        /*wx.previewImage({
          current: res.tempFilePath, // 当前显示图片的http链接
          urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })*/

        /*wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res)
          }
        })*/
        // console.log(res.tempFilePath)
      }
    })
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
    qrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: 'I love U',
      image: {
        imageResource: '/assets/images/state-thumbs-up.svg',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      }
    })
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
