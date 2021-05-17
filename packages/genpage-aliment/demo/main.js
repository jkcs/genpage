import Vue from 'vue'
import App from './App'
// import router from './router'
import badge from '../src/badge/index'

Vue.use(badge)

new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
