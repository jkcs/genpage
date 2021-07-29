import type { App } from 'vue'
import Image from './image'
import { WithAPPInstall } from '../utils'

Image.install = function (app: App) {
  app.component(Image.name, Image)
}

export { Image }
export default Image as WithAPPInstall<typeof Image>
