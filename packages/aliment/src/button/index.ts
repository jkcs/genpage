import type { App } from 'vue'
import Button from './button'
import { WithAPPInstall } from '../utils'

Button.install = function (app: App) {
  app.component(Button.name, Button)
}

export { Button }
export default Button as WithAPPInstall<typeof Button>
