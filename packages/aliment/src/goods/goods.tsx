import { defineComponent, SetupContext } from 'vue'
import { createBEM, isDef } from '@/utils'

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

    amount: [String, Number],

    unit: {
      type: String,
      default: '元'
    }
  },

  setup (props, ctx: SetupContext) {
    const renderImg = () => props.src && (
      <img class={ bem('img') } alt={ name } src={ props.src } />
    )

    const renderPrice = () => {
      if (!isDef(props.amount)) {
        return
      }

      const [_amount, __amount] = String(props.amount || 0).split('.')

      return (
        <div class={ bem('price') }>
          <span class={ bem('price-prefix') }>{ props.prefix }</span>
          <span class={ bem('price-amount') }>
            <span>{ isDef(_amount) ? _amount : '' }</span>
            <span>{ isDef(__amount) ? __amount : '' }</span>
          </span>
          <span class={ bem('price-unit') }>{ props.unit }</span>
        </div>
      )
    }

    return () => (
      <div class={ bem([props.size]) }>
        { renderImg() }
        <div class={ bem('content') }>
          <div class={ bem('name') }>
            { props.name }
          </div>
          { renderPrice() }
        </div>
      </div>
    )
  }
})
