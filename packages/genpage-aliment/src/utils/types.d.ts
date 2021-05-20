import { VNode } from 'vue';

export type EventHandler = (event: Event) => void;

export type ObjectIndex = Record<string, any>;

export type ScopedSlot<Props = any> = (
  props?: Props
) => VNode[] | VNode | undefined;

export type DefaultSlots = {
  default?: ScopedSlot;
};

export type ScopedSlots = DefaultSlots & {
  [key: string]: ScopedSlot | undefined;
};

export type ModelOptions = {
  prop?: string;
  event?: string;
};

export type DefaultProps = ObjectIndex;
