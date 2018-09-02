import Vue from 'vue'
import { mount } from '@vue/test-utils'

jest.mock('@/components/wormhole')

const PortalTarget = require('@/components/portal-target.js').default
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

let __id = 0

function generateVNode() {
  const el = document.createElement('DIV')
  const wrapper = new Vue({
    el,
    render(h) {
      __id++
      return h('div', [
        h('span', { key: `key-${__id}`, class: 'testnode' }, 'Test'),
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

  // check necessary because I regularly deactivate this during development
  it('is not an abstract component', () => {
    expect(PortalTarget.abstract).toBe(false)
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

  it('emits change event with the new last transport and old last transport when multiple is false', function() {
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
      expect(wrapper.emitted().change[0]).toMatchObject([
        expect.objectContaining({
          to: 'target',
          from: 'source',
          passengers: vNodes,
        }),
        expect.objectContaining({}),
      ])
    })
  })

  it('emits change event with the new and old transports when multiple is true', function() {
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
        expect(wrapper.emitted().change[0]).toMatchObject([
          newTransports,
          expect.arrayContaining([]),
        ])

        Wormhole.transports['target'] = newerTransports

        return wrapper.vm.$nextTick()
      })
      .then(() => {
        expect(wrapper.emitted().change[1]).toMatchObject([
          newerTransports,
          newTransports,
        ])
      })
  })

  it('renders when a transition name is passed as a string', () => {
    const wrapper = createWrapper({
      transition: 'fade',
    })

    expect(wrapper.element).not.toBe(undefined)
  })

  it('renders when a transition name is passed as an object', () => {
    const wrapper = createWrapper({
      transition: { name: 'fade' },
      slim: true,
    })

    expect(wrapper.element).not.toBe(undefined)
  })
})
