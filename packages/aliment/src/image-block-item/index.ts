import type { App } from 'vue'
import ImageBlockItem from './image-block-item'
import { WithAPPInstall } from '../utils'

ImageBlockItem.install = function (app: App) {
  app.component(ImageBlockItem.name, ImageBlockItem)
}

export { ImageBlockItem }
export default ImageBlockItem as WithAPPInstall<typeof ImageBlockItem>
