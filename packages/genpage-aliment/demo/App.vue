<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <gen-card ref="card" thumb="11111"></gen-card>
    <button @click="getTest">测试</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import Card from '@/card/Card'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
    getTest() {
        console.log(this.$refs.card)
        console.log((this.$refs.card as Card).getThumb())
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
