import { CreateElement, RenderContext } from 'vue'
import { preventDefault } from '@/utils/dom/event'
import { isDef, noop } from '@/utils'
import { inherit } from '@/utils/functional'
import { ScopedSlots } from '@/utils/types'
import { createFunctionComponent } from '@/utils/create/component'
import { BEM } from '@/utils/create/bem'

function preventTouchMove(event: TouchEvent) {
  preventDefault(event, true)
}

export type OverlayProps = {
  show?: boolean;
  zIndex?: number | string;
  duration: number | string | null;
  className?: any;
  lockScroll?: boolean;
  customStyle?: object;
};

function Overlay(
  context: RenderContext<OverlayProps>,
  props: OverlayProps,
  slots: ScopedSlots,
  bem: BEM,
  h: CreateElement
) {
  const style: { [key: string]: any } = {
    zIndex: props.zIndex,
    ...props.customStyle,
  }

  if (isDef(props.duration)) {
    style.animationDuration = `${ props.duration }s`
  }
  return (
    <transition name="van-fade">
      <div
        vShow={ props.show }
        style={ style }
        class={ [bem(), props.className] }
        onTouchmove={ props.lockScroll ? preventTouchMove : noop }
        {...inherit(context, true)}
      >
        { slots.default?.() }
      </div>
    </transition>
  )
}

Overlay.props = {
  show: Boolean,
  zIndex: [Number, String],
  duration: [Number, String],
  className: null as any,
  customStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true,
  }
}

export default createFunctionComponent(Overlay)
