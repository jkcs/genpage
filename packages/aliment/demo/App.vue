<template>
  <div id="app">
<!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <gen-card ref="card" thumb="11111">
      测试
    </gen-card>
    <gen-overlay :show="true">33333</gen-overlay>
    <button @click="getTest">测试</button>
  </div>
</template>

<script>
import Card from '@/card'
import HelloWorld from './components/HelloWorld'

export default {
    components: {
      HelloWorld
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
