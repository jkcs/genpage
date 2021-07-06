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
        },
        {
          id: 1,
          name: 'gen-goods',
          bind: {
            src: 'https://aliosstest.woaizuji.com/materiel/pic/15008349631256371_1aa4409aebbb4fcb8c6c6488f9904d36.jpg',
            name: '测试product',
            amount: 200
          }
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
