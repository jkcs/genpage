import { createApp } from 'vue'
import App from './App.vue'
import aliment from '@genpage/aliment'
import '@genpage/aliment/lib/index.css'

const app = createApp(App)

app.use(aliment)
app.mount('#app')
