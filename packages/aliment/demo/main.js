import { createApp } from 'vue'
import App from './App.vue'
import aliment from '../lib'
import '../lib/index.css'

const app = createApp(App)

app.use(aliment)
app.mount('#app')
