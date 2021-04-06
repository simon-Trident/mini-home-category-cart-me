// pages/Home/Home.js
const interfaces = require('../../utils/urlconfig')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    webViewUrl: "https://mp.weixin.qq.com/s?__biz=MzIzMDE0NzkyMg==&mid=100002379&idx=1&sn=170d2db0345262439f21665ed97787d4&chksm=68b698765fc11160bc2dcea8047f966a1b3810d58c94f1cf7c29f492323491f844b661067c84#rd",

    showWebView: false,

    swipers: [],
    logos: [],
    quicks: [],
    pageRow: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    wx.showLoading({
      title: '首页加载中',
    })
    wx.request({
      url: interfaces.homepage,
      header: {
        'content-type': "application/json"
      },
      success(res){
        self.setData({
          swipers: res.data.swipers,
          logos: res.data.logos,
          pageRow: res.data.pageRow,
          quicks: res.data.quicks
        })
        wx.hideLoading({
          success: (res) => {
          },
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