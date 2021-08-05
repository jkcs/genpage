import type { App } from 'vue'
import ImageBlock from './image-block'
import { WithAPPInstall } from '../utils'

ImageBlock.install = function (app: App) {
  app.component(ImageBlock.name, ImageBlock)
}

export { ImageBlock }
export default ImageBlock as WithAPPInstall<typeof ImageBlock>
