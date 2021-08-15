<template>
  <aside :class="['parent', direction]" :style="style">
    <div class="side-container" :style="{ width : width || '500px' }">
      <slot/>
    </div>
    <div @click="toggle" class="toggle-btn">
      <icon :class="['icon', direction, value ? 'active' : '']" name="arrow-left"/>
    </div>
  </aside>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export type direction = 'left' | 'right'

export default defineComponent({
  props: {
    width: String,
    value: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String as PropType<direction>,
      default: 'left'
    }
  },
  emits: ['update:value'],
  computed: {
    style () {
      const tx = this.direction === 'right'
        ? `translateX(${this.value ? '0%' : '100%'})`
        : `translateX(${this.value ? '0%' : '-100%'})`
      const _style = this.direction === 'right' ? { right: 0, left: 'unset' } : {}

      return {
        transform: tx,
        ..._style
      }
    }
  },
  methods: {
    toggle (): void {
      this.$emit('update:value', !this.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.parent {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  height: 100%;
  transition: transform .5s ease-in-out;
  z-index: 1;
  box-shadow: 8px 0 10px 1px rgb(0 0 0 / 10%);
  &.right {
    left: unset;
    right: 0;
    box-shadow: -8px 0 10px 1px rgb(0 0 0 / 10%);
    .toggle-btn {
      right: unset;
      left: -40px;
      transform: translateY(-50%) rotate(180deg);
    }
  }
  .toggle-btn {
    width: 40px;
    height: 60px;
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    overflow-x: hidden;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    box-shadow: 10px 0 10px 1px rgb(0 0 0 / 10%);
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      transition: all .5s ease-in-out;
      &.left {
        transform: translate(-50%, -50%) rotate(180deg);
        &.active {
          transform: translate(-50%, -50%) rotate(0deg);
        }
      }
      &.right {
        transform: translate(-50%, -50%) rotate(180deg);
        &.active {
          transform: translate(-50%, -50%) rotate(0deg);
        }
      }
    }
  }
}
</style>
