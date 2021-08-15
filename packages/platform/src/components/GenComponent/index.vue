<template>
  <component
    v-if="schema.name"
    :is="schema.name"
    v-bind="schema.bind"
    v-on="schema.event || {}"
  >
    <slot/>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TestCom from '../test-com/index.vue'

export default defineComponent({
  components: {
    TestCom
  },
  props: {
    schema: Object
  }
})
</script>

<style lang="scss" module scoped>

</style>
