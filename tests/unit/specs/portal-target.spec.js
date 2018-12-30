import Vue from 'vue'
import { mount } from '@vue/test-utils'
import nanoid from 'nanoid'
jest.mock('@/components/wormhole')

const PortalTarget = require('@/components/portal-target').default
const Wormhole = require('@/components/wormhole')

// Utils

function createWrapper(props = {}, options = {}) {
  return mount(PortalTarget, {
    data() {
      return {
        transports: Wormhole.transports,
        firstRender: true,
      }
    },
    propsData: {
      name: 'target',
      ...props,
    },
    ...options,
  })
}

function generateVNode() {
  const el = document.createElement('DIV')
  const wrapper = new Vue({
    el,
    render(h) {
      return h('div', [
        h('span', { key: `key-${nanoid()}`, class: 'testnode' }, 'Test'),
      ])
    },
  })
  return wrapper._vnode.children
}

describe('PortalTarget', function() {
  beforeEach(() => {
    // reset the mocked Wormhole's store.
    Wormhole.transports = {}
  })
  it('renders a single element for single vNode with slim prop & single slot element', () => {
    const vNode = Object.freeze(generateVNode())
    Vue.set(Wormhole.transports, 'target', [
      {
        from: 'target-portal',
        to: 'target',
        passengers: vNode,
      },
    ])
    const wrapper = createWrapper({ slim: true })
    expect(wrapper.is('.testnode')).toBe(true)
  })

  it('renders a wrapper with class `vue-portal-target` for multiple vNodes', () => {
    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    Vue.set(Wormhole.transports, 'target', [
      {
        from: 'test-portal',
        to: 'target',
        passengers: vNodes,
      },
    ])
    const wrapper = createWrapper()
    expect(wrapper.is('.vue-portal-target')).toBe(true)
  })

  it('renders slot content when no other content is available', function() {
    const wrapper = createWrapper(
      {},
      {
        slots: {
          default: `<p class="default">Test</p>`,
        },
      }
    )

    expect(wrapper.contains('p.default')).toBe(true)
  })

  it('emits change event', function() {
    const wrapper = createWrapper()

    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    Vue.set(Wormhole.transports, 'target', [
      {
        to: 'target',
        from: 'source',
        passengers: vNodes,
      },
    ])

    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0][0]).toEqual(expect.any(Boolean))
    })
  })

  it('emits change event when multiple is true', function() {
    const wrapper = createWrapper({ multiple: true })

    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    const newTransports = [
      {
        to: 'target',
        from: 'source',
        passengers: vNodes,
      },
      {
        to: 'target',
        from: 'source2',
        passengers: vNodes,
      },
    ]
    Vue.set(Wormhole.transports, 'target', newTransports)
    const newerTransports = newTransports.slice(0)
    newerTransports.push({ to: 'target', from: 'source3', passengers: vNodes })

    return wrapper.vm
      .$nextTick()
      .then(() => {
        expect(wrapper.emitted().change[0][0]).toEqual(true)

        Wormhole.transports['target'] = newerTransports

        return wrapper.vm.$nextTick()
      })
      .then(() => {
        expect(wrapper.emitted().change[1][0]).toEqual(true)
      })
  })

  it('renders when a transition name is passed as a string', () => {
    const wrapper = createWrapper({
      transition: 'fade',
    })

    expect(wrapper.element).not.toBe(undefined)
  })

  it('renders when a transition name is passed as an component', () => {
    const Transition = require('../resources/CustomTransition').default
    const wrapper = createWrapper({
      transition: Transition,
      slim: true,
    })

    expect(wrapper.element).not.toBe(undefined)
  })
})
