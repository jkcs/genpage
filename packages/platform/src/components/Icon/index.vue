<template>
  <svg class="svg-icon " aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'icon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName (): string {
      return `#icon-${this.name}`
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
