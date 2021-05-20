import { Vue } from 'vue-property-decorator'
import { createBEM } from '@/utils'

export default class GenComponent extends Vue {
  bem = createBEM(this.constructor.name)

  constructor() {
    super()
  }
}
