import {expect, td} from './helpers'
import Vue from 'vue'

const PortalTargetInj = require('!!inject-loader!babel-loader!../../src/components/portal-target.js')

const transports = {}

const PortalTarget = new PortalTargetInj({
  './wormhole': { transports: transports },
}).default

// Utils
function generateTarget (props) {
  const el = document.createElement('DIV')
  return new Vue({
    ...PortalTarget,
    name: 'target',
    propsData: props,
  }).$mount(el)
}

let __id = 0

function generateVNode () {
  const el = document.createElement('DIV')
  const vm = new Vue({
    el,
    render (h) {
      __id++
      return h('div', [h('span', { key: `key-${__id}`, class: 'testnode' }, 'Test')])
    },
  })
  return vm._vnode.children
}

describe('PortalTarget', function () {
  beforeEach(() => {
    td.reset()
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

    const vm = generateTarget({
      name: 'target',
      slim: true,
    })

    const el = vm.$el
    expect(el.classList.contains('testnode')).to.be.true

    vm.$destroy()
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

    const vm = generateTarget({
      name: 'target',
    })

    const el = vm.$el
    return vm.$nextTick().then(() => {
      expect(el.classList.contains('vue-portal-target')).to.be.true
      vm.$destroy()
    })
  })

  it('applies attributes correctly to root node', () => {
    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    Vue.set(transports, 'target', [
      {
        from: 'test-portal',
        to: 'target',
        passengers: vNodes,
      },
    ])

    const vm = generateTarget({
      name: 'target',
      attributes: {
        class: 'red blue',
        id: 'test-id',
      },
    })
    const el = vm.$el
    return vm.$nextTick().then(() => {
      expect(el.classList.contains('red')).to.be.true
      expect(el.getAttribute('id')).to.equal('test-id')
      vm.$destroy()
    })
  })

  // check necessary because I regularly deactivate this during development
  it('is an abstract component', () => {
    expect(PortalTarget.abstract).to.be.true
  })

  it('renders slot content when no other content is available', function () {
    const vm = new Vue({
      components: { PortalTarget },
      template: `
        <portal-target name="target">
          <p class="default">This is the default content</p>
        </portal-target>
      `,
    }).$mount(document.createElement('DIV'))

    return vm.$nextTick().then(() => {
      const el = vm.$el.querySelector('p.default')
      expect(el).to.exist
      vm.$destroy()
    })
  })

  it('emits change event with the new last transport and old last transport when multiple is false', function () {
    const spy = td.function('changeHandler') // {}
    /* eslint no-unused-vars: 0 */
    const el = document.createElement('DIV')
    const vm = new Vue({
      components: { PortalTarget },
      template: `<portal-target name="target" @change="handler"/>`,
      methods: {
        handler: spy,
      },
    }).$mount(el)
    const vNodes = Object.freeze([generateVNode()[0], generateVNode()[0]])
    Vue.set(transports, 'target', [{
      to: 'target',
      from: 'source',
      passengers: vNodes,
    }])
    return vm.$nextTick().then(() => {
      td.verify(spy({
          to: 'target', from: 'source', passengers: vNodes,
        },
        {},
      ))
      vm.$destroy()
    })
  })

  it('emits change event with the new and old transports when multiple is true', function () {
    const spy = td.function('changeHandler') // {}
    /* eslint no-unused-vars: 0 */
    const el = document.createElement('DIV')
    const vm = new Vue({
      components: { PortalTarget },
      template: `<portal-target name="target" @change="handler" :multiple="true"/>`,
      methods: {
        handler: spy,
      },
    }).$mount(el)
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

    return vm.$nextTick().then(() => {
      td.verify(spy(newTransports, []))

      transports['target'] = newerTransports

      return vm.$nextTick()
    }).then(() => {
      td.verify(spy(newerTransports, newTransports))
      vm.$destroy()
    })
  })

  it('correctly creates a transition when specified', function () {
    // This testcase should also verify if the transition classes are actually applied,
    // but I have not found a way to test that yet.
    // TODO: check how Vue itself is testing that.
    const spy = td.function('enter')

    const vm = new Vue({
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

    return vm.$nextTick().then(() => { // needed so the portal-target can mount.
      Vue.set(transports, 'target', [
        {
          to: 'target',
          from: 'source',
          passengers: vNode,
        },
      ])
      return vm.$nextTick().then(() => {
        td.verify(spy(td.matchers.isA(HTMLElement), td.matchers.isA(Function)))
        vm.$destroy()
      })
    })
  })

  it('doesnt create a transition when on first render specified', function () {
    const spy = td.function('enter')

    const vm = new Vue({
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

    Vue.set(transports, 'target', {
      to: 'target',
      from: 'source',
      passengers: vNode,
    })
    return vm.$nextTick().then(() => {
      td.verify(spy(), { times: 0, ignoreExtraArgs: true })
      vm.$destroy()
    })
  })

  it('create a transition on first render when appear specified', function () {
    const spy = td.function('enter')

    const vm = new Vue({
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

    Vue.set(transports, 'target', {
      to: 'target',
      from: 'source',
      passengers: vNode,
    })
    return vm.$nextTick().then(() => {
      td.verify(spy(td.matchers.isA(HTMLElement), td.matchers.isA(Function)))
      vm.$destroy()
    })
  })
})
