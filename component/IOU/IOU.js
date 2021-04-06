// component/IOU/IOU.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    baitiao: {
      type: Array,
      value: []
    },
    hideBaitiao: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView (e) {
      if (e.target.dataset.target == 'self') {
        this.setData({
          hideBaitiao: true
        })
      }
    },
    seletedItem(e) {
      let index = e.currentTarget.dataset.index
      let baitiao = this.data.baitiao
      for (let i = 0; i < baitiao.length; i++) {
        baitiao[i].select = false;
      }

      // 选中
      baitiao[index].select = !baitiao[index].select

      // 更新数据
      this.setData({
        baitiao: baitiao,
        selectedIndex: index
      })
    },
    makeBaitiao(e){
      // 隐藏弹窗
      this.setData({
        hideBaitiao: true
      })

      // 拿到选中的Item
      const selectedItem = this.data.baitiao[this.data.selectedIndex]
      this.triggerEvent("updateSelect", selectedItem)
    }
  }
})
