import test from 'ava'
import sinon from 'sinon'

// import PortalInjector from 'inject!../src/components/portal'
import Wormhole from '../../src/components/wormhole'
import Portal from '../../src/components/portal'

const methods = ['sendUpdate', 'get', 'clear']

// stub wormhole
test.before(t => {
  methods.forEach(method => {
    sinon.stub(Wormhole, method)
  })
})

test.after(t => {
  methods.forEach(method => {
    Wormhole[method].restore()
  })
})

let vm, el
const to = 'destination'
const payload = []

// create Component instance
test.beforeEach(t => {
  vm = new Vue({
    ...Portal,
    propsData: {
      to: to
    }
  })
  el = document.createElement('DIV')
  vm.$mount(el)

})

test('calls wormhole.sendUpdate() on mount', t => {

  t.true(wormhole.sendUpdate.called)
})

test('calls wormhole.sendUpdate() on update', t => {
  vm.$forceUpdate()
  t.true(wormhole.sendUpdate.calledTwice)
})

test('calls wormhole.clear beforeDestroy', t => {
  vm.$destroy()
  t.true(wormhole.clear.called)
})

test('tag prop renders comment node', t => {
  vm.$nextTick(() => {
    t.true(vm.$el.nodeType === 8)
  })
})

test('sendUpdate() calls wormhole.sendUpdate()', t => {
  vm.sendUpdate(to, payload)
})
