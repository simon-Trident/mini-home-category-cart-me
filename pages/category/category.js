// pages/category/category.js
const interfaces = require("../../utils/urlconfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems: [],
    navRightItems: [],
    curIndex: 0
  },
  
  switchTab (e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex: index
    })
  },

  showListView (e) {
    const txt = e.currentTarget.dataset.txt
    // 页面跳转
    wx.navigateTo({
      url: '/pages/list/list?title='+txt,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '分类加载中...',
    })
    const self = this
    wx.request({
      url: interfaces.productions,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        wx.hideLoading()
        
        self.setData({
          navLeftItems: res.data.navLeftItems,
          navRightItems: res.data.navRightItems
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})