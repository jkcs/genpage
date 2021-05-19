<template>
  <div>
    <gen-card
      num="2"
      price="2.00"
      :thumb="imageURL"
    />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imageURL: 'https://img.yzcdn.cn/vant/ipad.jpeg',
      }
    },
  }
</script>

<style lang="less">
  @import '../../style/var';

  .demo-card {
    background-color: @white;
  }
</style>
