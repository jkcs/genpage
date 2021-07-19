# genpage-aliment

### TODO
vue-cli-plugin-genpage
- [x] build-lib
    - [x] umd 支持
- [x] build
- [x] server
- [x] 升级至vue3.0全面支持typescript

aliment

- [ ] 基础组件
    - [ ] toast
    - [ ] button
    - [ ] icon
    - [ ] form
    - [ ] input
    - [ ] upload
    - [ ] image
      + props
      
      | props | 说明 | 类型 | 值 | 默认值 |
      | --- | --- | --- | ---| --- |
      | width | 控制整个组件的宽 | string / number |
      | height | 控制整个组件的高 | string / number |
      | src | 图片的src | string |
      | fit | 图片object-fit值 | string |
      | alt | 图片alt值 | string |
      | lazy | 是否懒加载 | boolean |
      | referrer-policy | 原生 referrerPolicy | string |
      | preview | 是否启用图片预览 | Array<string> / string | 
      | v-model:preview | 是否开启图片预览 |
      
      + emits
      
      | emit | 说明 | 参数 |
      | --- | --- | --- |
      | load | 加载完成 | Event |
      | error | 加载失败 | Event |
      
      + slots 
        
      | slot | 说明 | 
      | --- | --- | 
      | placeholder | 图片未加载的占位内容 | 
      | error | 图片加载失败的内容 |

    - [ ] swipe
    - [ ] swipe-item
    - [ ] goods
      + props
      
      | props | 说明 | 类型 | 值 | 默认值 |
      | --- | --- | --- | ---| --- |
      | width | 控制整个组件的宽 | string / number |
      | size | 控制文字的大小和padding | string | `mini, small, medium, max` |
      | imgProps | 图片组件的 props |
      | fit | 图片object-fit值 | string |
      | name | 商品名 | string |
      | prefix | 价格前缀 | string |
      | amount | 价格 | string / number |
      | unit | 单位 | string / number |
      | border | 是否有边框 | boolean |
      
      + emit

      | emit | 说明 | 参数 |
      | --- | --- | --- |
      | click | 点击时 | Event |
      | imgLoad | 图片加载完成 | Event |
      | imgError | 图片加载失败 | Event |

      + slots

      | slot | 说明 | 
      | --- | --- | 
      | imgPlaceholder | 图片未加载的占位内容 | 
      | imgError | 图片加载失败的内容 |
      
    - [ ] waterfall
      + props

      | props | 说明 | 类型 | 值 | 默认值 |
      | --- | --- | --- | ---| --- |
      | span | 间隙 | string / number |
      | col | 列数 | number |  | 2 |

      + slots

      | slot | 说明 | 
      | --- | --- | 
      | bottom | 下滑到底展示 | 

      + emit

      | emit | 说明 | 参数 |
      | --- | --- | --- |
      | reachBottom | 下滑到底部时 | Event |
  
- [ ] 功能
    - [ ] `npm run component`
        - [ ] 选择生成组件类型
        - [ ] 输入组件名
        
admin
- [ ] 生成页面
    - [ ] 头部展示页面
    - [ ] 左侧选择组件
    - [ ] 中部预览
    - [ ] 右侧填写内容

client
- [ ] 功能组件
    - [ ] 抽奖转盘
    - [ ] 商品图标
    
- [ ] 界面预览组件
- [ ] 承接界面渲染

demo 页面
- [ ] demo1
    - [ ] 头部放宣传图
    - [ ] 中间抽奖
    - [ ] 展示商品
    - [ ] 展示规则
