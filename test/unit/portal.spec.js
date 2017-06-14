/* global describe it beforeEach */
import { expect, td } from './helpers'
import Vue from 'vue'
const PortalInj = require('!!inject-loader!babel-loader!../../src/components/portal.js')

const Wormhole = td.object(['open', 'close'])
const PortalTarget = {
  render (h) { return h('div') },
  props: ['name', 'id', 'tag'],
}
const Portal = PortalInj({
  './wormhole': Wormhole,
  './portal-target': PortalTarget,
}).default

let vm

describe('Portal', function () {
  beforeEach(function () {
    td.reset()

    const el = document.createElement('DIV')
    vm = new Vue({
      components: { Portal },
      data: { destination: 'destination', message: 'TestString', disabled: false, tag: 'DIV' },
      template: `
      <div>
        <portal :to="destination" ref="portal" :disabled="disabled" :tag="tag">
          <span id="test-span">{{message}}</span>
        </portal>
      </div>`,
    }).$mount(el)
  })

  it('works when no slot content is provided', () => {
    let err = false
    try {
      const mountEl = document.createElement('DIV')
      vm = new Vue({
        template: `<div><portal to="destination"></portal></div>`,
        components: { Portal },
      }).$mount(mountEl)
    } catch (error) {
      err = true
    }

    expect(err).to.be.false
    const el = vm.$el.querySelector('.v-portal')
    expect(el).not.to.be.undefined
  })

  it('renders a div element with class `v-portal`', function () {
    // expect(vm.$refs.portal.$el.nodeName).to.equal('#comment')
    const el = vm.$el.querySelector('.v-portal')
    expect(el).not.to.be.undefined
  })

  it('renders no extra root element with slim prop', () => {
    const el = document.createElement('DIV')

    vm = new Vue({
      components: { Portal },
      template: `
      <div>
        <portal to="destination" ref="portal" :disabled="true" slim>
          <span id="test-span"></span>
        </portal>
      </div>`,
    }).$mount(el)

    const rootEl = vm.$el.querySelector('.v-portal')
    expect(rootEl).to.be.null
  })

  it('renders different element when tag prop is defined', () => {
    vm.tag = 'SPAN'
    return vm.$nextTick().then(function () {
      const el = vm.$el.querySelector('span.v-portal')
      expect(el).not.to.be.undefined
    })
  })

  it('calls Wormhole.open with right content', function () {
    const captor = td.matchers.captor()

    // spy called:
    td.verify(Wormhole.open(captor.capture()))
    const vnode = captor.value.passengers[0]
    // sent correct vnodes as slot content
    expect(vnode.tag).to.equal('span')
    expect(vnode.children[0].text).to.equal(vm.message)
  })

  it('calls Wormhole close & sendUpdate when destination changes', () => {
    const closeCaptor = td.matchers.captor()
    const openCaptor = td.matchers.captor()
    vm.destination = 'destination2'
    return vm.$nextTick().then(() => {
      td.verify(Wormhole.close(closeCaptor.capture()))
      expect(closeCaptor.value).to.have.property('to', 'destination')

      td.verify(Wormhole.open(openCaptor.capture()), { ignoreExtraArgs: true })
      expect(openCaptor.values[1]).to.have.property('to', 'destination2')

      return true
    })
  })

  it('calls Wormhole.close() when destroyed', () => {
    const closeCaptor = td.matchers.captor()

    vm.$destroy()
    td.verify(Wormhole.close(closeCaptor.capture()))
    expect(closeCaptor.value).to.have.property('to', 'destination')
  })

  it('calls sendUpdate when content changes', () => {
    vm.message = 'New Test String'
    return vm.$nextTick().then(() => {
      const captor = td.matchers.captor()
      td.verify(Wormhole.open(captor.capture()))

      // get second call's first value
      const textNode = captor.values[1].passengers[0].children[0]
      expect(textNode.text).to.equal('New Test String')
    })
  })

  it('renders locally when `disabled` prop is true', () => {
    vm.disabled = true

    return vm.$nextTick().then(() => {
      const span = vm.$el.querySelector('#test-span')

      expect(span).not.to.be.undefined
    })
  })

  // check necessary because I regularly deactivate this during development
  it('is an abstract component', () => {
    expect(Portal.abstract).to.be.true
  })
})
