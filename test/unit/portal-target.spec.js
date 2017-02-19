/* global describe it afterEach */
import { expect } from './helpers'
import Vue from 'vue'
import PortalTargetInj from '!!vue-loader?inject!../../src/components/portal-target'

const routes = {}

const PortalTarget = new PortalTargetInj({
  './wormhole': { routes: routes },
})

describe('PortalTarget', function () {
  afterEach(() => {
    const keys = Object.keys(routes)
    for (let i = 0; i < keys.length; i++) {
      Vue.delete(routes, keys[i])
    }
  })

  it('renders a single element for single vNode with slim prop & single slot element', () => {
    Vue.set(routes, 'target', Object.freeze(generateVNode()))

    const vm = generateTarget({
      name: 'target',
      slim: true,
    })

    const el = vm.$el
    expect(el.classList.contains('testnode')).to.be.true
  })

  it('renders a wrapper with class `vue-portal-target` for multiple vNodes', () => {
    const vNodes = Object.freeze([generateVNode(), generateVNode()])
    Vue.set(routes, 'target', vNodes)

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
    Vue.set(routes, 'target', vNodes)

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
