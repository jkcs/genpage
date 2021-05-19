/**
 * Create a basic component with common options
 */
import Vue, {
  VNode,
  ComponentOptions,
  RenderContext,
} from 'vue'
import { DefaultProps } from '../types'

export interface GenComponentOptions<V extends Vue = Vue> extends ComponentOptions<V> {
  functional?: boolean;
}

export type TsxBaseProps<Slots> = {
  key: string | number;
  // hack for jsx prop spread
  props: any;
  class: any;
  style: string | object[] | object;
  scopedSlots: Slots;
};

export type TsxComponent<Props, Events, Slots> = (
  props: Partial<Props & Events & TsxBaseProps<Slots>>
) => VNode;

// unify slots & scopedSlots
export function unifySlots(context: RenderContext) {
  // use data.scopedSlots in lower Vue version
  const scopedSlots = context.scopedSlots || context.data.scopedSlots || {}
  const slots = context.slots()

  Object.keys(slots).forEach((key) => {
    if (!scopedSlots[key]) {
      scopedSlots[key] = () => slots[key]
    }
  })

  return scopedSlots
}

// should be removed after Vue 3
/*
function transformFunctionComponent(
  pure: FunctionComponent
): GenComponentOptions {
  return {
    name: pure.name,
    functional: true,
    props: pure.props,
    model: pure.model,
    render: (h, context): any =>
      pure(context, context.props, unifySlots(context)),
  }
}
*/

export function createComponent(name: string) {
  return function <Props = DefaultProps, Events = {}, Slots = {}>(
    sfc: GenComponentOptions
  ): TsxComponent<Props, Events, Slots> {
    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || []
      // sfc.mixins.push(SlotsMixin)
    }

    sfc.name = name
    return sfc as TsxComponent<Props, Events, Slots>
  }
}

/*export function createFunctionComponent(name: string) {
  return function <Props = DefaultProps, Events = {}, Slots = {}>(
    sfc: FunctionComponent
  ): TsxComponent<Props, Events, Slots> {
    return transformFunctionComponent(sfc) as TsxComponent<Props, Events, Slots>
  }
}*/
