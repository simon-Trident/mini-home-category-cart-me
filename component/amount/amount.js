// component/amount/amount.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
    }
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
    handleInputChange(e) {
      let count  = e.detail.value
      // 注册事件
      this.triggerEvent("handleInput", {count})
    },
    add() {
      let count = this.data.count
      this.setData({
        count: ++count
      })
      // 注册事件
      this.triggerEvent("handleInput", {count})
      this.triggerEvent("handleAdd")
    },
    subtract() {
      let count = this.data.count
      count > 1 ? count-- : 1;
      this.setData({
        count: count
      })
      this.triggerEvent("handleInput", {count})
      this.triggerEvent("handleSub")
    }
  }
})
