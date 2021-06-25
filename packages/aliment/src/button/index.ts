import type { App } from 'vue'
import button from './button'

button.install = function (vue: App) {
  vue.component(button.name, button)
  vue.component('GenButton', button)
}

export default button
