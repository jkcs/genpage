import { CSSProperties, defineComponent, PropType, SetupContext } from 'vue'
import { createBEM, ComponentSize, isDef } from '../utils'
import { addUnit } from '../utils/format/unit'

const {
  name,
  bem
} = createBEM('button')

export type ButtonType = 'primary' | 'default' | 'striking' | 'text'

export default defineComponent({
  name,

  emits: ['click'],

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
    const onCLick = (event: Event) => {
      if (!props.disabled) {
        ctx.emit('click', event)
      }
    }
    const style: CSSProperties = {}

    if (isDef(props.radius)) {
      style.borderRadius = addUnit(props.radius)
    }

    return () => (
      <div class={bem([props.type, props.size])} style={style} onClick={onCLick}>
        {ctx.slots.default?.()}
      </div>
    )
  }
})
