<template>
  <div class="row">
    <div class="button">
      <gen-button @click="getTest">测试</gen-button>
    </div>
    <div class="goods">
      <gen-goods></gen-goods>
    </div>
  </div>
</template>

<script>
export default {
    components: {
    },
    methods: {
      getTest() {
          console.log(this.$refs.card)
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
