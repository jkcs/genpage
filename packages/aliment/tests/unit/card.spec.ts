import { mount } from '@vue/test-utils'
import Card from '@/card/Card'
import { getClassName } from '@/utils/create'

describe('Card', () => {
  it('renders props.thumb when passed', () => {
    const thumb = 'thumb'
    const wrapper = mount(Card, {
      propsData: { thumb },
      slots: {
        default: thumb
      }
    })

    expect(wrapper.classes(getClassName(Card.name)))
    expect(wrapper.text()).toMatch(thumb)
  })
})
