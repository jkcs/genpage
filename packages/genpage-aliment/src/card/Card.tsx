import { Component, Mixins, Prop } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import GenComponent from '@/utils/model/GenComponent'


@Component
export default class Card extends Mixins(GenComponent) {
  @Prop() private readonly thumb?: string

  getThumb(): string {
    return this.thumb || ''
  }

  render(): VNode {
    return (
      <div class={ this.bem() }>
        { this.getSlotDefault() }
      </div>
    )
  }
}
