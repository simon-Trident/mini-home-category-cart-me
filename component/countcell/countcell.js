// component/countcell/countcell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideSelectItem: {
      type: Boolean,
      value: true
    },
    partData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideView (e) {
      if (e.target.dataset.target == "self") {
        this.setData({
          hideSelectItem: true
        })
      }
    },
    getCount(e) {
      this.triggerEvent("onHandleInput", e.detail)
    },
    handleAddToCart(){
      this.setData({
        hideSelectItem: true
      })

      // 注册事件
      this.triggerEvent("handleAddToCart")
    }
  }
})
