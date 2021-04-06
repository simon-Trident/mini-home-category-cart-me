// pages/list/list.js
const interfaces = require("../../utils/urlconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 0,
    size: 5,
    noData: false
  },

  switchProlistDetail (e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.prolist[index].id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.requestListData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestListData(() => {
      // 停止下拉刷新
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    })

    // 重置下拉数据
    this.setData({
      page: 1,
      noData: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 停止下拉刷新
    wx.stopPullDownRefresh()
    // bar loading
    wx.showNavigationBarLoading({
      success: (res) => {},
    })

    // 拿到原来的数组
    const prolist = this.data.prolist;
    let page = this.data.page;
    this.setData({
      page: ++page
    })

    let reqUrl = interfaces.productionsList + "/" + this.data.page + "/" + this.data.size
    const self = this
    wx.request({
      url: reqUrl,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        if (res.data.length == 0) {
          self.setData({
            noData: true
          })
        } else {
          res.data.forEach(item => {
            prolist.push(item)
          })
          self.setData({
            prolist: prolist
          })
        }
        // 隐藏头部加载状态
        wx.hideNavigationBarLoading()
      }
    })
  },

  requestListData: function (callFunc) {
    const self = this
    wx.showLoading({
      title: '分页加载中...',
    })
    let reqUrl = interfaces.productionsList
    wx.request({
      url: reqUrl,
      header: {
        "content-type": "application/json"
      },
      success (res) {
        wx.hideLoading()
        self.setData({
          prolist: res.data
        })
        if (callFunc) {
          callFunc()
        }
      }
    })
  }

})