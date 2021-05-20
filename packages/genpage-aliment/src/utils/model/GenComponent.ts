import { Vue, Component } from 'vue-property-decorator'
import { createBEM } from '@/utils'
import { PropOptions } from 'vue'
import { Mods } from '@/utils/create/bem'

@Component
export default class GenComponent extends Vue {

  public bem(...args: any): Mods {
    return createBEM(this.constructor.name)(...args)
  }

  public getSlotDefault(props?: PropOptions): string {
    return this.$scopedSlots.default
      ? (this.$scopedSlots as any).default(props)
      : ''
  }
}
