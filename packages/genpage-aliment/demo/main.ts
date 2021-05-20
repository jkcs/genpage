import Vue from 'vue'
import App from './App.vue'
import Card from '@/card'
import Overlay from '@/overlay'

Vue.config.productionTip = false
Vue.use(Card)
Vue.use(Overlay)

new Vue({
  render: h => h(App)
}).$mount('#app')
