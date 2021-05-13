import Vue from 'vue';
import PackageEntry from './package-entry';
import './package-style';



Vue.use(PackageEntry);



export const demos = {
  
};
export const config = {
  "name": "vant",
  "entry": "./src/main.js",
  "build": {
    "skipInstall": [
      "lazyload"
    ],
    "site": {
      "publicPath": "https://b.yzcdn.cn/vant/"
    },
    "vetur": {
      "tagPrefix": "van-"
    }
  },
  "site": {
    "defaultLang": "en-US",
    "versions": [
      {
        "label": "1.x",
        "link": "/vant/1.x/"
      },
      {
        "label": "3.x",
        "link": "/vant/next/"
      }
    ],
    "baiduAnalytics": {
      "seed": "ad6b5732c36321f2dafed737ac2da92f"
    },
    "locales": {
      "zh-CN": {
        "title": "Vant",
        "description": "轻量、可靠的移动端 Vue 组件库",
        "logo": "https://img.yzcdn.cn/vant/logo.png",
        "langLabel": "中文",
        "links": [
          {
            "logo": "https://b.yzcdn.cn/vant/logo/weapp.svg",
            "url": "/vant-weapp"
          },
          {
            "logo": "https://b.yzcdn.cn/vant/logo/github.svg",
            "url": "https://github.com/youzan/vant"
          }
        ],
        "searchConfig": {
          "apiKey": "90067aecdaa2c85220e2783cd305caac",
          "indexName": "vant",
          "placeholder": "搜索文档..."
        },
        "nav": []
      },
      "en-US": {
        "title": "Vant",
        "description": "Mobile UI Components built on Vue",
        "logo": "https://img.yzcdn.cn/vant/logo.png",
        "langLabel": "En",
        "links": [
          {
            "logo": "https://b.yzcdn.cn/vant/logo/weapp.svg",
            "url": "/vant-weapp"
          },
          {
            "logo": "https://b.yzcdn.cn/vant/logo/github.svg",
            "url": "https://github.com/youzan/vant"
          }
        ],
        "searchConfig": {
          "apiKey": "90067aecdaa2c85220e2783cd305caac",
          "indexName": "vant",
          "placeholder": "Search..."
        },
        "nav": []
      }
    }
  }
}
