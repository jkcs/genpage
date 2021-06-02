/**
 * Create a basic component with common options
 */
import { createBEM } from '..'
import Vue, {
  VNode,
  VueConstructor,
  ComponentOptions,
  FunctionalComponentOptions,
  RenderContext, CreateElement
} from 'vue'
import { DefaultProps, FunctionComponent } from '../types'

export interface GenComponentOptions extends ComponentOptions<Vue> {
  name?: string;
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
export function unifySlots (context: RenderContext) {
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
function transformFunctionComponent (
  pure: FunctionComponent
): GenComponentOptions {
  return {
    name: pure.name,
    functional: true,
    props: pure.props,
    model: pure.model,
    render: (h: CreateElement, context: RenderContext): any =>
      pure(context, context.props, context.scopedSlots, createBEM(pure.name), h)
  }
}

export function createFunctionComponent<Props = DefaultProps, Events = {}, Slots = {}> (
  sfc: Function
): GenComponentOptions {
  return transformFunctionComponent(sfc as FunctionComponent)
}
