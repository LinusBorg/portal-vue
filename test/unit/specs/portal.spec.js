import { mount } from 'vue-test-utils'
import Vue from 'vue'

jest.mock('@/components/wormhole')

const Portal = require('@/components/portal').default
const Wormhole = require('@/components/wormhole').default

function createWrapper (props = {}) {
  return mount(Portal, {
    propsData: {
      to: 'destination',
      name: 'source',
      ...props,
    },
    slots: {
      default: `<span class="test-span">Test</span>`,
    },
  })
}

describe('Portal', function () {
  beforeEach(() => {
    Wormhole.open.mockClear()
    Wormhole.close.mockClear()
  })

  it('renders a div element with class `v-portal`', function () {
    // expect(wrapper.$refs.portal.$el.nodeName).to.equal('#comment')
    const wrapper = mount(Portal)
    expect(wrapper.is('div.v-portal')).toBe(true)
  })

  it('renders no extra root element with slim prop', () => {
    const wrapper = mount(Portal, {
      propsData: {
        slim: true,
        disabled: true,
        to: 'destination',
      },
      slots: {
        default: `<span class="test-span"></span>`,
      },
    })
    expect(wrapper.is('span.test-span')).toBe(true)
  })

  it('renders different element when tag prop is defined', () => {
    const wrapper = createWrapper({
      tag: 'SPAN',
    })
    expect(wrapper.is('SPAN')).toBe(true)
  })

  it('calls Wormhole.open with right content', function () {
    createWrapper()
    expect(Wormhole.open).toHaveBeenCalledWith(expect.objectContaining({
      to: 'destination',
      from: 'source',
      passengers: expect.any(Array),
    }))
  })

  it('calls Wormhole close & sendUpdate when destination changes', () => {
    const wrapper = createWrapper()
    wrapper.setProps({ to: 'destination2' })

    expect(Wormhole.close).toHaveBeenCalled()
    expect(Wormhole.open.mock.calls.length).toEqual(2)
  })

  it('calls Wormhole.close() when destroyed', () => {
    const wrapper = createWrapper()
    wrapper.destroy()
    expect(Wormhole.close).toHaveBeenCalledWith({
      to: 'destination',
      from: 'source',
    })
  })

  it('calls sendUpdate when content changes', () => {
    const wrapper = new Vue({
      components: {
        Portal,
      },
      data () {
        return {
          message: 'A',
        }
      },
      template: `
        <div><portal to="destintion" name="source">
          <span>{{message}}</span>
        </portal>
        </div>
      `,
    }).$mount(document.createElement('DIV'))
    wrapper.message = 'New Test String'
    return wrapper.$nextTick().then(() => {
      expect(Wormhole.open.mock.calls.length).toEqual(2)
    })
  })

  it('renders locally when `disabled` prop is true', () => {
    const wrapper = createWrapper({ disabled: true })

    expect(wrapper.contains('.test-span')).toBe(true)
  })

  // check necessary because I regularly deactivate this during development
  it('is an abstract component', () => {
    expect(Portal.abstract).toBe(true)
  })
})
