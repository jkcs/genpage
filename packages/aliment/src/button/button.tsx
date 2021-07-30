import { defineComponent, PropType, SetupContext } from 'vue'
import { createBEM, ComponentSize } from '../utils'

const { name, bem } = createBEM('button')

export type ButtonType = 'primary' | 'default' | 'striking' | 'text'

export default defineComponent({
  name,

  props: {
    size: {
      type: String as PropType<ComponentSize>,
      default: 'medium'
    },

    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },

    radius: [Number, String],

    disabled: Boolean
  },

  setup (props, ctx: SetupContext) {
    const onCLick = (event?: Event) => {
      if (!props.disabled) {
        ctx.emit('click', event)
      }
    }

    return () => (
      <div class={ bem([props.type, props.size]) } onClick={onCLick}>
        { ctx.slots.default?.() }
      </div>
    )
  }
})
