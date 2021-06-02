import { mount } from '@vue/test-utils'
import Overlay from '@/overlay'

describe('Overlay', () => {
  it('renders props.thumb when passed', () => {
    const component = {
      name: 'test-component',
      render (h) {
        return h('div', [])
      }
    }

    const wrapper = mount(Overlay, {
      propsData: {
        zIndex: '9999'
      },
      slots: {
        default: component
      }
    })

    console.log(wrapper.element)
    // expect(wrapper.classes(getClassName(Overlay.name)))
    expect(wrapper.element.style.zIndex).toEqual('9999')
  })
})
