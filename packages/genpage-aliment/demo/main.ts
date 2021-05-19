import Vue from 'vue'
import App from './App.vue'
import Card from '@/card'

Vue.config.productionTip = false
console.log(Card)
Vue.use(Card)

new Vue({
  render: h => h(App)
}).$mount('#app')
