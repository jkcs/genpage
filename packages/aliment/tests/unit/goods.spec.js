import { mount } from '@vue/test-utils'
import goods from '@/goods'
import { createBEM } from '@/utils'

describe('goods', () => {
  const { name, bem } = createBEM('goods')

  // size src fit name prefix amount unit
  it('renders props src,size,fit when passed', () => {
    const props = {
      src: 'https://avatar-static.segmentfault.com/233/773/2337735386-5eda17279fcd6_big64',
      size: 'mini',
      fit: 'fill'
    }
    const wrapper = mount(goods, { propsData: props })
    const element = wrapper.element
    const imgElement = wrapper.element.querySelector('.gen-goods__img')?.firstElementChild
    // size
    expect(element.className).toContain('gen-goods--mini')
    // src
    expect(imgElement.getAttribute('src')).toEqual(props.src)
    // fit
    expect(imgElement.style.objectFit).toEqual(props.fit)
  })

  it('renders name,prefix,amount,unit when passed', () => {
    const props = {
      name: 'product',
      prefix: '',
      amount: '100.99',
      unit: '元/s'
    }
    const wrapper = mount(goods, { propsData: props })
    const element = wrapper.element
    const nameElement = element.querySelector('.gen-goods__name')
    const priceElement = element.querySelector('.gen-goods__price')
    const amountElement = priceElement.querySelector('.' + bem('price-amount'))
    // name
    expect(nameElement).not.toBeNull()
    expect(nameElement.innerHTML).toEqual(props.name)

    // prefix
    expect(priceElement).not.toBeNull()
    expect(priceElement.querySelector('.gen-goods__price-prefix').innerHTML).toEqual(props.prefix)

    // amount
    expect(amountElement).not.toBeNull()
    expect(amountElement.firstElementChild.innerHTML).toEqual(props.amount.split('.')[0])
    expect(amountElement.lastElementChild.innerHTML).toEqual('.' + props.amount.split('.')[1])
  })
})
