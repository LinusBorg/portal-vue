import test from 'ava'
import sinon from 'sinon'

import {default as Wormhole, buffer } from '../src/components/wormhole'

const name = 'test'
const spy = sinon.spy()
const payload = []
wormhole.$on(name, spy)

test.beforeEach(t => {
  spy.reset()
})
test('sendUpdate()', t => {
  t.plan(3)

  Wormhole.sendUpdate(name, payload)

  t.true(spy.called)
  t.is(spy.getCall(0).args[0], payload)
  t.is(buffer[name], payload)
})

test('get()', t => {
  Wormhole.sendUpdate(name, payload)

  t.is(Wormhole.get(test), payload)
})

test('clear()', {
  Wormhole.sendUpdate(name, payload)
  Wormhole.clear(name)

  t.true(spy.calledTwice)

  t.true(buffer[name], null)
})
