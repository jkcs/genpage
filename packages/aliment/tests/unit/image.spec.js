import { mount } from '@vue/test-utils'
import image from '@/image'
import { createBEM } from '@/utils'

describe('image', () => {

  const {
    name,
    bem
  } = createBEM('image')

  const component = {
    name: 'test-component',
    render (h) {
      return h('div', [])
    }
  }
  // fit src alt width height radius
  it('renders props src,alt,radius when passed', () => {
    const props = {
      src: 'https://avatar-static.segmentfault.com/233/773/2337735386-5eda17279fcd6_big64',
      alt: 'the alt',
    }
    const wrapper = mount(image, { propsData: props })
    expect(wrapper.element.firstElementChild.getAttribute('src')).toEqual(props.src)
    expect(wrapper.element.firstElementChild.getAttribute('alt')).toEqual(props.alt)
  })

  it('renders props width,height when passed', () => {
    const props = {
      width: 10,
      height: '10%',
    }
    const wrapper = mount(image, { propsData: props })

    expect(wrapper.element.style.width).toEqual('10px')
    expect(wrapper.element.style.height).toEqual(props.height)
  })

  it('renders props radius when passed', () => {
    const props = { radius: 10 }
    const wrapper = mount(image, { propsData: props })

    expect(wrapper.element.style.borderRadius).toEqual('10px')
    expect(wrapper.element.className).toContain('gen-image--radius')
  })

  it('renders props fit when passed', () => {
    const props = { fit: 'fill' }
    const wrapper = mount(image, { propsData: props })

    expect(wrapper.element.firstElementChild.style.objectFit).toEqual(props.fit)
  })

  it('renders props events when passed', async () => {
    const props = { events: 'none' }
    const component = {
      name: 'test-component',
      components: {
        'gen-image': image
      },
      template: `<div @click="handleClick('TestClick')"><gen-image v-bind="$attrs" ></gen-image></div>`,
      methods: {
        handleClick() {
          this.$emit('TestClick', 'TestClick')
        }
      }
    }
    const wrapper = mount(component, { propsData: props })

    const imgElement = wrapper.element.querySelector('.' + bem('img'))
    expect(imgElement).not.toBeNull()
    expect(imgElement.style.pointerEvents).toEqual(props.events)
    await wrapper.find('.' + bem('img')).trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
    expect(wrapper.emitted().TestClick[0]).toEqual(['TestClick'])

    await wrapper.setProps({ events: 'auto' })
    expect(imgElement.style.pointerEvents).toEqual('auto')
    await wrapper.find('.' + bem('img')).trigger('click')
    expect(wrapper.emitted().click.length).toBe(2)
    expect(wrapper.emitted().TestClick[0]).toEqual(['TestClick'])
  })

})
