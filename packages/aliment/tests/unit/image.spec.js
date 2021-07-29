import { mount } from '@vue/test-utils'
import image from '@/image'

describe('image', () => {
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

})
