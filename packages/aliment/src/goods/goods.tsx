import { defineComponent, SetupContext } from 'vue'
import { createBEM } from '@/utils'

const { name, bem } = createBEM('goods')

export default defineComponent({
  name,

  props: {
    size: {
      type: String,
      default: 'midden'
    },

    src: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    prefix: {
      type: String,
      default: '￥'
    },

    amount: {
      type: [String, Number],
      default: ''
    },

    unit: {
      type: String,
      default: '元'
    }
  },

  setup (props, ctx: SetupContext) {
    const Img = (
      <img class={ bem('img') } alt={ name } src={ props.src } />
    )

    const price = (
      <div class={ bem('price') }>
        <span class={ bem('price-prefix') }>{ props.prefix }</span>
        <span class={ bem('price-amount') }>{ props.amount }</span>
        <span class={ bem('price-unit') }>{ props.unit }</span>
      </div>
    )

    return () => (
      <div class={ bem([props.size]) }>
        { props.src && Img }
        <div class={ bem('content') }>
          <div class={ bem('content__title') }>
            { props.name }
          </div>
          { props.amount && price }
        </div>
      </div>
    )
  }
})
