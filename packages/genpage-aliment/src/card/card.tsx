import { Component, Prop } from 'vue-property-decorator'
import { VNode } from 'vue'
import GenComponent from '@/utils/model/GenComponent'


@Component
export default class Card extends GenComponent {
  @Prop() private thumb?: string

  private getThumb(): string {
    return this.thumb || ''
  }

  render(): VNode {
    return (
      <div class={ this.bem('a') }>
        11111
        { this.bem('a') }
        { this.thumb }
      </div>
    )
  }
}
