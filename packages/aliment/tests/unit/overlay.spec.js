import { mount } from '@vue/test-utils'
import Overlay from '@/overlay/Overlay'
import Vue, { ComponentOptions } from 'vue'
import { Component, VNode, CreateElement } from 'vue'

describe('Overlay', () => {
  it('renders props.thumb when passed', () => {
    const component: ComponentOptions<Vue> = {
      name: 'test-component',
      render(h: CreateElement): VNode {
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
