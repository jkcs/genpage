import type { App } from 'vue'
import Goods from './goods'
import { WithAPPInstall } from '../utils'

Goods.install = function (app: App) {
  app.component(Goods.name, Goods)
}

export { Goods }
export default Goods as WithAPPInstall<typeof Goods>
