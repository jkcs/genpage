import { createBEM, getName } from '../utils/create'

const name = getName('card')
const bem = createBEM(name)

const props = {
  thumb: String
}

export default {
  name,
  props,

  render () {
    return (
      <div class={ [bem()] }>
        { this.thumb }
      </div>
    )
  }
}
