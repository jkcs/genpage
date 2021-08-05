import { mount } from '@vue/test-utils'
import button from '@/button'
import { createBEM } from '@/utils'

describe('button', () => {
  const { name, bem } = createBEM('button')

  it('renders slot when passed', () => {
    const props = {
      size: 'mini',
      type: 'primary',
      radius: 10
    }
    const wrapper = mount(button, {
      propsData: props,
      slots: {
        default: 'button'
      }
    })
    const element = wrapper.element

    expect(element.innerHTML).toBe('button')
  })

  // size type radius
  it('renders props size,type,radius when passed', () => {
    const props = {
      size: 'mini',
      type: 'primary',
      radius: 10
    }
    const wrapper = mount(button, { propsData: props })
    const element = wrapper.element
    const classes = wrapper.classes()
    // size
    expect(classes).toContain(bem([props.size]).split(' ')[1])
    // type
    expect(classes).toContain(bem([props.type]).split(' ')[1])
    // radius
    expect(element.style.borderRadius).toEqual(props.radius + 'px')
  })

  it('renders prop disabled when passed', async () => {
    const props = {
      disabled: true
    }
    const component = {
      template: `<gen-button :disabled="disabled" @click="handleClick"/>`,
      props: {
        disabled: Boolean
      },
      components: {
        'gen-button': button
      },
      methods: {
        handleClick() {
          this.$emit('TestClick')
        }
      }
    }
    const wrapper = mount(component, {
      propsData: props,
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted().TestClick).not.toBeDefined()

    await wrapper.setProps({ disabled: false })
    await wrapper.trigger('click')
    expect(wrapper.emitted().TestClick?.length).toBe(1)
  })
})
