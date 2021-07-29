import { computed, CSSProperties, defineComponent, PropType } from 'vue'
import { createBEM, isDef } from '../utils'
import { addUnit } from '../utils/format/unit'

const {
  name,
  bem
} = createBEM('image')

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export default defineComponent({
    name,

    props: {
      fit: String as PropType<ImageFit>,
      src: String,
      alt: String,
      width: [Number, String],
      height: [Number, String],
      radius: [Number, String]
    },

    setup (props, ctx) {
      const style = computed<CSSProperties>(() => {
        const style: CSSProperties = Object.create(null)
        const {
          width,
          height,
          radius
        } = props

        if (isDef(width)) {
          style.width = addUnit(width)
        }

        if (isDef(height)) {
          style.height = addUnit(height)
        }

        if (isDef(radius)) {
          style.borderRadius = addUnit(radius)
        }

        return style
      })

      const renderImage = () => {

        return (<img class={bem('img')} src={props.src} alt={props.alt} style={{ objectFit: props.fit }}/>)
      }

      return () => (
        <div class={bem({ radius: !!props.radius })} style={style.value}>
          {renderImage()}
        </div>
      )
    }
  }
)
