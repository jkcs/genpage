import { ComponentOptions, VNode } from 'vue'
import { BEM } from '@/utils/create/bem'

export type EventHandler = (event: Event) => void;

export type ObjectIndex = Record<string, any>;

export type ScopedSlot<Props = any> = (
  props?: Props
) => VNode[] | VNode | undefined;

export type DefaultSlots = {
  default?: ScopedSlot;
}

export type ScopedSlots = DefaultSlots & {
  [key: string]: ScopedSlot | undefined;
}

export type ModelOptions = {
  prop?: string;
  event?: string;
}

export type FunctionComponent<Props = DefaultProps,
  PropDefs = PropsDefinition<Props>> = {
  (
    context: RenderContext<Props>,
    props: Props,
    slots: ScopedSlots,
    bem?: BEM,
    h: CreateElement
  ): VNode | undefined;
  props?: PropDefs;
  model?: ModelOptions;
  inject?: InjectOptions;
  mixins?: ComponentOptions;
};

export type DefaultProps = ObjectIndex;
