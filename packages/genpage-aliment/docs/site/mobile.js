import Vue from 'vue'
import Lazyload from '../../src/lazyload'

Vue.use(Lazyload, {
  lazyComponent: true,
})

// flag for vant-weapp demos
const isWeapp = location.search.indexOf('weapp=1') !== -1

let demoUid = 0

// helper for demo locales
Vue.mixin({
  computed: {
    isWeapp() {
      return isWeapp
    },
  },

  beforeCreate() {
    if (!this.$options.name) {
      this.$options.name = `demo-${demoUid++}`
    }

    const { i18n, name } = this.$options

  },
})
