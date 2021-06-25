import { createApp } from 'vue'
import App from './App.vue'
import Button from '@/button'
import '@/button/index.less'

const app = createApp(App)

app.use(Button)
app.mount('#app')
