<template>
  <transition>
    <div v-show="value" class="side-container">
      <slot/>
      <div class="toggle-btn">
        <icon name="arrow-left"/>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export type direction = 'left' | 'right'

export default defineComponent({
  props: {
    width: String,
    value: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String as PropType<direction>,
      default: 'left'
    }
  },
  emits: ['update:value'],
  methods: {
    toggle (): void {
      this.$emit('update:value', !this.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.side-container {

  .toggle-btn {
    &.left {

    }
  }
}
</style>
