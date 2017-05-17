transports/* global describe it afterEach */
import { expect } from './helpers'
import Vue from 'vue'
import PortalTargetInj from '!!vue-loader?inject!../../src/components/portal-target'

const transports = {}

const PortalTarget = new PortalTargetInj({
  './wormhole': { transports: transports },
})

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
      passenger: vNode,
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
})
