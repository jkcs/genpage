import { defineComponent, PropType, SetupContext } from 'vue'
import { ComponentSize, createBEM, isDef } from '../utils'
import Image, { ImageFit } from '../image/image'

const {
  name,
  bem
} = createBEM('goods')

export default defineComponent({
  name,

  props: {
    size: {
      type: String as PropType<ComponentSize>,
      default: 'medium'
    },

    src: {
      type: String,
      default: ''
    },

    fit: String as PropType<ImageFit>,

    name: {
      type: String,
      default: ''
    },

    prefix: {
      type: String,
      default: '¥'
    },

    amount: [String, Number],

    unit: {
      type: String,
      default: '元'
    }
  },

  setup (props, ctx: SetupContext) {
    const style = { objectFit: 'cover' }
    const renderImg = () => props.src && (
      <Image class={bem('img')} alt={props.name} src={props.src} style={style}/>
    )

    const renderPrice = () => {
      if (!isDef(props.amount)) {
        return
      }

      const [_amount, __amount] = String(props.amount || 0).split('.')

      return (
        <div class={bem('price')}>
          <span class={bem('price-prefix')}>{props.prefix}</span>
          <span class={bem('price-amount')}>
            <span>{isDef(_amount) ? _amount : ''}</span>
            <span>{isDef(__amount) ? __amount : ''}</span>
          </span>
          <span class={bem('price-unit')}>{props.unit}</span>
        </div>
      )
    }

    return () => (
      <div class={bem([props.size])}>
        {renderImg()}
        <div v-if={!!props.name} class={bem('content')}>
          <div class={bem('name')}>
            {props.name}
          </div>
          {renderPrice()}
        </div>
      </div>
    )
  }
})
