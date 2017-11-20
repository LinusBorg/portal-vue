//import { td } from './helpers'
import Vue from 'vue'
import { mount } from 'vue-test-utils'

jest.mock('@/components/wormhole')

const PortalTarget = require('@/components/portal-target.js').default
const transports = require('@/components/wormhole').transports
// Utils
function generateTarget (props) {
  const el = document.createElement('DIV')
  return new Vue({
    ...PortalTarget,
    name: 'target',
    propsData: props,
  }).$mount(el)
}

function createWrapper (props = {}, options = {}) {
  return mount(PortalTarget, {
    propsData: {
      name: 'target',
      ...props,
    },
    ...options,
  })
}

let __id = 0

function generateVNode () {
  const el = document.createElement('DIV')
  const wrapper = new Vue({
    el,
    render (h) {
      __id++
      return h('div', [h('span', { key: `key-${__id}`, class: 'testnode' }, 'Test')])
    },
  })
  return wrapper._vnode.children
}

describe('PortalTarget', function () {
  beforeEach(() => {

  })
  afterEach(() => {
    const keys = Object.keys(transports)
    for (let i = 0; i < keys.length; i++) {
      Vue.delete(transports, keys[i])
    }
  })

  it('renders a single element for single vNode with slim prop & single slot element', () => {
    const vNode = Object.freeze(generateVNode())
    Vue.set(transports, 'target', [
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
    Vue.set(transports, 'target', [
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
  it('is an abstract component', () => {
    expect(PortalTarget.abstract).toBe(true)
  })

  it('renders slot content when no other content is available', function () {
    const wrapper = createWrapper({}, {
      slots: {
        default: `<p class="default">Test</p>`,
      },
    })

    expect(wrapper.contains('p.default')).toBe(true)
  })

  it('emits change event with the new last transport and old last transport when multiple is false', function () {
    const wrapper = createWrapper()

    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    Vue.set(transports, 'target', [{
      to: 'target',
      from: 'source',
      passengers: vNodes,
    }])

    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toMatchObject([
        expect.objectContaining({
          to: 'target', from: 'source',
          passengers: vNodes,
        }),
        expect.objectContaining({}),
      ])
    })
  })

  it('emits change event with the new and old transports when multiple is true', function () {
    const wrapper = createWrapper({ multiple: true })

    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    const newTransports = [{
      to: 'target',
      from: 'source',
      passengers: vNodes,
    }, {
      to: 'target',
      from: 'source2',
      passengers: vNodes,
    }]
    Vue.set(transports, 'target', newTransports)
    const newerTransports = newTransports.slice(0)
    newerTransports.push({ to: 'target', from: 'source3', passengers: vNodes })

    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toMatchObject([
        newTransports, expect.arrayContaining([])
      ])

      transports['target'] = newerTransports

      return wrapper.vm.$nextTick()
    }).then(() => {
      expect(wrapper.emitted().change[1]).toMatchObject([
        newerTransports, newTransports,
      ])
    })
  })

  it.only('correctly creates a transition when specified', function () {
    // This testcase should also verify if the transition classes are actually applied,
    // but I have not found a way to test that yet.
    // TODO: check how Vue itself is testing that.
    const spy = jest.fn()
    const wrapper = createWrapper({
      transition: { name: 'fade' },
      'transition-events': {
        enter: spy,
      },
    }, {
      slots: {
        default: `<p class="default" key="p1">This is the default content</p>`,
      },
    })

    const vNode = Object.freeze(generateVNode())
    Vue.set(transports, 'target', [
      {
        to: 'target',
        from: 'source',
        passengers: vNode,
      },
    ])

    return wrapper.vm.$nextTick().then(() => {
      expect(spy).toHaveBeenCalledWith(expect.any(HTMLElement), expect.any(Function))
      td.verify(spy(td.matchers.isA(HTMLElement), td.matchers.isA(Function)))
      wrapper.$destroy()
    })
  })

  it('doesnt create a transition when on first render specified', function () {
    const spy = td.function('enter')

    const wrapper = new Vue({
      created () {
        this.spy = spy
      },
      components: { PortalTarget },
      template: `
        <portal-target name="target" ref="target"
          :transition="{name: 'fade'}"
          :transition-events="{enter: spy}"
          >
          <p class="default" key="p1">This is the default content</p>
        </portal-target>
      `,
    }).$mount(document.createElement('DIV'))

    const vNode = Object.freeze(generateVNode())

    Vue.set(transports, 'target', [{
      to: 'target',
      from: 'source',
      passengers: vNode,
    }])
    return wrapper.$nextTick().then(() => {
      td.verify(spy(), { times: 0, ignoreExtraArgs: true })
      wrapper.$destroy()
    })
  })

  it('create a transition on first render when appear specified', function () {
    const spy = td.function('enter')

    const wrapper = new Vue({
      created () {
        this.spy = spy
      },
      components: { PortalTarget },
      template: `
        <portal-target name="target" ref="target"
          :transition="{name: 'fade', appear: true}"
          :transition-events="{enter: spy}"
          >
          <p class="default" key="p1">This is the default content</p>
        </portal-target>
      `,
    }).$mount(document.createElement('DIV'))

    const vNode = Object.freeze([generateVNode()])

    Vue.set(transports, 'target', [{
      to: 'target',
      from: 'source',
      passengers: vNode,
    }])
    return wrapper.$nextTick().then(() => {
      td.verify(spy(td.matchers.isA(HTMLElement), td.matchers.isA(Function)))
      wrapper.$destroy()
    })
  })
})
