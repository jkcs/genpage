import { mount, shallowMount } from '@vue/test-utils'
import Image from '@/image'
import ImageBlock from '@/image-block'
import ImageBlockItem from '@/image-block-item'
import { defineAsyncComponent } from 'vue'

describe('image-block', () => {
  it('test vue life', () => {
    const createdComponent = (name) => {
      return {
        name,
        render () {
          return (<div>
            {this.$slots?.default()}
          </div>)
        },
        beforeCreate () {
          console.log(name, 'beforeCreate')
        },
        created () {
          console.log(name, 'created')
        },
        beforeMount () {
          console.log(name, 'beforeMount')
        },
        mounted () {
          console.log(name, 'mounted')
        },
        beforeUpdate () {
          console.log(name, 'beforeUpdate')
        },
        updated () {
          console.log(name, 'updated')
        },
        beforeDestroy () {
          console.log(name, 'beforeDestroy')
        },
        destroyed () {
          console.log(name, 'destroyed')
        }
      }
    }
    const components = Array.from({ length: 3 })
      .map((_, index) => createdComponent(`component${index + 1}`))
      .reduce((res, item, index) => {
        res[item.name] = index === 1 ? defineAsyncComponent(() => new Promise((resolve, reject) => {
          resolve(item)
        })) : item
        return res
      }, {})
    components.component2.components = {
      component3: components.component3
    }
    const component = {
      components,
      render () {
        return (<div>
          <component1>
            <component2>
              <component3>111</component3>
            </component2>
          </component1>
        </div>)
      }
    }

    const wrapper = mount(component, {
      shallow: false
    })

    expect(wrapper.find('div')).not.toBeNull()
  })

  it('renders image-block props use image props when passed', () => {
    const props = {
      src: 'https://avatar-static.segmentfault.com/233/773/2337735386-5eda17279fcd6_big64',
      alt: 'the alt',
      width: 10,
      height: '10%',
      radius: 10,
      fit: 'fill',
      events: 'none'
    }

    const wrapper = mount(ImageBlock, {
      propsData: props,
      shallow: true,
      global: {
        subs: {
          'gen-image': true
        }
      }
    })

    const image = wrapper.findComponent(Image)
    expect(image.props()).toEqual(props)
  })

  it('renders image-block props.type when passed', async () => {
    const props = {
      type: 'flex'
    }

    const wrapper = shallowMount(ImageBlock, { props })

    const getClasses = () => wrapper.find('.gen-image-block__warp').classes()

    expect(getClasses()).toContain('gen-image-block__warp--flex')
    expect(getClasses()).not.toContain('gen-image-block__warp--float')

    await wrapper.setProps({ type: 'float' })

    expect(getClasses()).toContain('gen-image-block__warp--float')
  })

  it('renders image-block with image-block-item slots when passed', async () => {
    const props = {
      type: 'float'
    }

    const slotDefault = {
      render () {
        const items = Array.from({ length: 3 }).map(_ => <gen-image-block-item/>)
        return (
          items
        )
      }
    }

    const wrapper = mount(ImageBlock, {
      props,
      slots: {
        default: slotDefault
      },
      global: {
        components: { 'gen-image-block-item': ImageBlockItem }
      }
    })

    const allImageBlockItem = () => wrapper.findAllComponents(ImageBlockItem)

    const every = (className) => allImageBlockItem().every(item => item.classes().includes(className))
    expect(every('gen-image-block-item--float')).toBeTruthy()
  })
})
