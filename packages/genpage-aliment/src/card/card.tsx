/*
 import { ComponentOptions, Component } from 'vue'
 import { GenComponentOptions } from '@/utils/create/component'
 import { createNamespace } from '@/utils'

 const { createComponent, createBEM } = createNamespace('card')

 export type CardProps = {
   thumb?: string
 }

 declare global {
   namespace NodeJS {
     interface Global {
       windows: Electron.BrowserWindow;
     }
   }
 }

 export default createComponent<CardProps>({
   name: 'card',
   props: {
     thumb: String
   },
   data() {
     return {
       a: 1
     }
   },
   methods: {
     getThumb() {
       return this.thumb
     }
   },
   render() {
     return (
       <div class={ 'card' }>
         { this.thumb }
       </div>
     )
   }
 })
*/

import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'


@Component
export default class Card extends Vue {
  @Prop() private thumb?: string

  private getThumb(): string {
    return this.thumb || ''
  }

  render(): VNode {
    return (
      <div class={ 'card' }>
        11111
        { this.thumb }
      </div>
    )
  }
}
