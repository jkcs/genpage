import { defineComponent, inject, SetupContext } from 'vue'
import { createBEM } from '../utils'

const {
  name,
  bem
} = createBEM('image-block-item')

export default defineComponent({
  name,

  setup (props, ctx: SetupContext) {
    // 非响应
    const imageBlockType = inject('type', 'flex')

    return () => (
      <div class={bem([imageBlockType])}>
        {ctx.slots.default?.()}
      </div>
    )
  }
})
