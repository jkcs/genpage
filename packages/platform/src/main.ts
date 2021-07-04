import { createApp } from 'vue'
import App from './App.vue'
import aliment from '@genpage/aliment/lib/index.js'

createApp(App)
  .use(aliment)
  .mount('#app')
