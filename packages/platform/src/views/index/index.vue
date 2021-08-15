<template>
  <div class="gen-platform">
    <gen-side>
      1111
    </gen-side>
    <aside class="left">
      11
    </aside>
    <main class="center">
      <div class="container">
        <gen-container
          :component-list="componentList"
        >
        </gen-container>
      </div>

    </main>
    <div class="right">22</div>
  </div>
</template>

<script lang="ts">
import GenContainer from '../../components/GenContainer/index.vue'
import GenSide from '@/components/GenSide/index.vue'

export default {
  components: {
    GenContainer,
    GenSide
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
        },
        {
          id: 1,
          name: 'gen-image',
          bind: {
            src: 'https://aliosstest.woaizuji.com/materiel/pic/15008349631256371_1aa4409aebbb4fcb8c6c6488f9904d36.jpg'
          }
        },
        {
          id: 1,
          name: 'gen-image-block',
          bind: {
            src: 'https://aliosstest.woaizuji.com/materiel/pic/15008349631256371_1aa4409aebbb4fcb8c6c6488f9904d36.jpg'
          },
          child: [
            {
              id: 2,
              name: 'gen-image-block-item',
              bind: {
                src: 'https://aliosstest.woaizuji.com/materiel/pic/15008349631256371_1aa4409aebbb4fcb8c6c6488f9904d36.jpg'
              }
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .gen-platform {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    &::after {
      display: table-cell;
      content: "";
      clear: both;
    }
    .left, .right {
      width: 500px;
      height: 100%;
      background-color: deepskyblue;
      float: left;
    }
    .center {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 375px;
      height: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
      padding: 20px 0;
      .container {
        width: 100%;
        height: 750px;
        overflow-y: scroll;
        box-shadow: 0 0 10px 1px rgb(0 0 0 / 30%);
        background-color: rgba(0, 0, 0, .3);
        &::-webkit-scrollbar {
          width: 0 !important;
        }
      }
      //background-color: #ff4230;
      box-sizing: border-box;
    }
    .right {
      background-color: #ff4230;
      float: right;
    }
  }
</style>
