import { defineComponent, PropType, SetupContext } from 'vue'
import { createBEM, BUTTON_TYPE } from '../utils'

const { name, bem } = createBEM('button')

export default defineComponent({
  name,

  props: {
    type: {
      type: String as PropType<BUTTON_TYPE>,
      default: 'default'
    },

  },

  setup (props, ctx: SetupContext) {
    return () => (
      <div class={ bem([props.type]) }>
        { ctx.slots.default?.() }
      </div>
    )
  }
})
