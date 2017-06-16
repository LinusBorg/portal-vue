import { expect, td } from './helpers'
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

function generateVNode () {
  const el = document.createElement('DIV')
  const vm = new Vue({
    el,
    render (h) {
      return h('div', [h('span', { class: 'testnode' }, 'Test')])
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
    Vue.set(transports, 'target', {
      from: 'target-portal',
      to: 'target',
      passengers: vNode,
    })

    const vm = generateTarget({
      name: 'target',
      slim: true,
    })

    const el = vm.$el
    expect(el.classList.contains('testnode')).to.be.true
  })

  it('renders a wrapper with class `vue-portal-target` for multiple vNodes', () => {
    const vNodes = Object.freeze([generateVNode(), generateVNode()])
    Vue.set(transports, 'target', {
      from: 'test-portal',
      to: 'target',
      passengers: vNodes,
    })

    const vm = generateTarget({
      name: 'target',
    })

    const el = vm.$el
    return vm.$nextTick().then(() => {
      expect(el.classList.contains('vue-portal-target')).to.be.true
    })
  })

  it('applies attributes correctly to root node', () => {
    const vNodes = Object.freeze([generateVNode(), generateVNode()])
    Vue.set(transports, 'target', {
      from: 'test-portal',
      to: 'target',
      passengers: vNodes,
    })

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
    })
  })

  // check necessary because I regularly deactivate this during development
  it('is an abstract component', () => {
    expect(PortalTarget.abstract).to.be.true
  })

  it('emits change event with correct payload', function () {
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
    const vNodes = Object.freeze([generateVNode(), generateVNode()])
    Vue.set(transports, 'target', {
      to: 'target',
      from: 'source',
      passengers: vNodes,
    })
    return vm.$nextTick().then(() => {
      td.verify(spy({
        to: 'target', from: 'source', passengers: vNodes },
        {}
      ))
    })
  })
})
