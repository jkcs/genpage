import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import aliment from '@genpage/aliment'

createApp(App)
  .use(aliment)
  .mount('#app')
