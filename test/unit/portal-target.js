import test from 'ava'
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

test.todo('Tests for PortalTarget component')
