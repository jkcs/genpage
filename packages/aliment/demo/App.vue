<template>
  <div id="app">
    <button @click="getTest">测试</button>
  </div>
  <gen-button>测试</gen-button>
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
