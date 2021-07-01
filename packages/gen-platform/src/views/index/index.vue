<template>
  <div :class="$style['gen-platform']">
    <aside></aside>
    <main>
      <gen-container
        :component-list="componentList"
      >

      </gen-container>
    </main>
  </div>
</template>

<script lang="ts">
import GenContainer from '../../components/GenContainer/index.vue'
export default {
  components: {
    GenContainer
  },
  data (): Record<string, unknown> {
    return {
      componentList: [
        {
          id: 1,
          name: 'test-com',
          child: [
            {
              id: 2,
              name: 'test-com'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" module scoped>
  .gen-platform {

  }
</style>
