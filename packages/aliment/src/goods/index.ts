import type { App } from 'vue'
import goods from './goods'

goods.install = function (vue: App) {
  vue.component(goods.name, goods)
  vue.component('GenGoods', goods)
}

export default goods
