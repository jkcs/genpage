import { defineComponent, PropType, provide, SetupContext } from 'vue'
import { createBEM, keys, pick } from '../utils'
import Image, { ImageProps } from '../image/image'

const {
  name,
  bem
} = createBEM('image-block')

export type ImageBlockType = 'flex' | 'float'

export default defineComponent({
  name,

  props: {
    ...ImageProps,

    type: {
      type: String as PropType<ImageBlockType>,
      default: 'flex'
    }

  },

  provide () {
    return {
      type: this.type
    }
  },

  setup (props, ctx: SetupContext) {
    const imgProps = pick(props, keys(ImageProps))

    return () => (
      <div class={bem()}>
        <Image class={bem('img')} {...imgProps}/>
        <div class={bem('warp', props.type)}>
          {ctx.slots.default?.()}
        </div>
      </div>
    )
  }
})
