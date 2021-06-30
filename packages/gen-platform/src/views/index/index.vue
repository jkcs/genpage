<template>
  <div :class="$style['gen-platform']">
    <aside></aside>
    <main>
      <gen-container>

      </gen-container>
    </main>
  </div>
</template>

<script lang="ts">
import GenContainer from '../../components/GenContainer/index.vue'
export default {
  components: {
    GenContainer
  }
}
</script>

<style lang="scss" module scoped>
  .gen-platform {

  }
</style>
