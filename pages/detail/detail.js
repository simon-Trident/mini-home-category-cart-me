// pages/detail/detail.js
const interfaces = require("../../utils/urlconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baitiao: [],
    partData: {},
    autoplay: true,
    circular: false,
    interval: 2500,
    baitiaoSelectItem:{
      desc: "[白条支付] 首单享立减优惠"
    },
    hideBaitiao: true,
    hideSelectItem: true,
    badgeCount: 0
  },

  handleBaitiaoView (e) {
    // 显示白条弹框
    this.setData({
      hideBaitiao: false
    })
  },

  handleCountView (e) {
    this.setData({
      hideSelectItem: false
    })
  },

  updateCount (e) {
    let partData = this.data.partData
    partData.count = e.detail.count
    this.setData({
      partData: partData
    })
  },
  handleUpdate(e){
    this.setData({
      baitiaoSelectItem: e.detail
    })
  },

  setBadge(cartArray){
    this.setData({
      badgeCount: cartArray.length
    })
  },

  addToCart(){
    let self = this;
    wx.getStorage({
      key: 'cartInfo',
      success(res){
        // 先将本地存储的数据存起来
        const cartArray = res.data
        // 拿到当前商品数据
        let partData = self.data.partData
        // 判断数组是否存在该商品
        let isExist = false
        // 已有商品， total累加
        cartArray.forEach(cart => {
          if (cart.id == partData.id) {
            isExist = true
            cart.total += self.data.partData.count
            // 本地存储
            wx.setStorage({
              data: cartArray,
              key: 'cartInfo',
            })
          }
        })

        // 如果不在数组中， 将商品直接push进去
        if (!isExist) {
          partData.total = self.data.partData.count
          cartArray.push(partData)
          // 本地存储
          wx.setStorage({
            data: cartArray,
            key: 'cartInfo',
          })
        }

        // 更新badge
        self.setBadge(cartArray)
      },
      fail(){
        let partData = self.data.partData
        partData.total = self.data.partData.count
        // 存储的数组
        let cartArray = []
        cartArray.push(partData)
        // 本地存储
        wx.setStorage({
          data: cartArray,
          key: 'cartInfo',
        })
        // 更新badge
        self.setBadge(cartArray)
      }
    })
    // 加入购物车
    wx.showToast({
      title: '成功加入购物车',
      icon: "success",
      duration: 3000
    })
  },

  handleCartView(){
    // 页面跳转
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const self = this
    wx.showLoading({
      title: '详情加载中',
    })
    wx.request({
      url: interfaces.productionsDetail,
      header: {
        "content-type": "application/json"
      },
      success (res) {
        wx.hideLoading()
        let result = null
        res.data.forEach(item => {
          if (item.partData.id == id) {
            result = item
          }
        })

        self.setData({
          partData: result.partData,
          baitiao: result.baitiao
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const self = this
    wx.getStorage({
      key: 'cartInfo',
      success(res){
        const cartArray = res.data
        self.setBadge(cartArray)
      }
    })
  },
})