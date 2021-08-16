import { createApp, Plugin } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import aliment from '@genpage/aliment'
import '@genpage/aliment/lib/index.css'
import '@/assets/css/index.scss'
import '@/assets/icons'
import Icon from './components/Icon/index.vue'

const app = createApp(App)

app.component('Icon', Icon)
app.use(router)
app.use(aliment)
app.mount('#app')
