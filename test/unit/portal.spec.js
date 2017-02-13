import { expect, td } from './helpers'
import Vue from 'vue'
import PortalInj from '!!vue-loader?inject!../../src/components/portal'

const Wormhole = td.object(['sendUpdate', 'get', 'clear'])
const PortalTarget = {
  render(h) { return h('div') },
  props: ['name', 'id', 'tag'],
  mounted: td.function()
}
const Portal = PortalInj({
  './wormhole': Wormhole,
  './portal-target': PortalTarget,
})
let vm

describe('Portal', function() {

  beforeEach(function() {
    td.reset()

    const el = document.createElement('DIV')
    vm = new Vue({
      components: { Portal },
      data: { destination: 'destination', message: 'TestString', disabled: false, tag: 'DIV'},
      template: `
      <div>
        <portal :to="destination" ref="portal" :disabled="disabled" :tag="tag">
          <span id="test-span">{{message}}</span>
        </portal>
      </div>`
    }).$mount(el)
  })


  it('renders a div element with class `v-portal`', function() {
    //expect(vm.$refs.portal.$el.nodeName).to.equal('#comment')
    const el = vm.$el.querySelector('.v-portal')
    expect(el).not.to.be.undefined
  })


  it ('renders different element when tag prop is defined', () => {
    vm.tag = 'SPAN'
    return vm.$nextTick().then(() => {
      const el = vm.$el.querySelector('span.v-portal')
      expect(el).not.to.be.undefined
    })
  })


  it('calls Wormhole sendUpdate with right content', function() {
    const captor = td.matchers.captor()

    // spy called:
    td.verify(Wormhole.sendUpdate('destination', captor.capture()))
    const vnode = captor.values[0][0]
    // sent correct vnodes as slot content
    expect(vnode.tag).to.equal('span')
    expect(vnode.children[0].text).to.equal(vm.message)
  })


  it('calls Wormhole clear & sendUpdate when destination changes', () => {
    const captor = td.matchers.captor()
    vm.destination = 'destination2'
    return vm.$nextTick().then(() => {
      td.verify(Wormhole.clear('destination'))
      td.verify(Wormhole.sendUpdate(captor.capture()), {ignoreExtraArgs: true})

      expect(captor.values[1]).to.equal('destination2')
       return true
    })

  })


  it('calls Wormhole.clear() when destroyed', () => {
    vm.$refs.portal.$destroy()
    td.verify(Wormhole.clear('destination'))
  })


  it('calls sendUpdate when content changes', () => {
    vm.message = 'New Test String'
    return vm.$nextTick().then(() => {

      const captor = td.matchers.captor()
      td.verify(Wormhole.sendUpdate('destination', captor.capture()))

      // get second call's first value
      const textNode = captor.values[1][0].children[0]
      expect(textNode.text).to.equal('New Test String')
    })
  })


  it('renders locally when `disabled` prop is true', () => {
    vm.diabled = true

    return vm.$nextTick().then(() => {
      const span = vm.$el.querySelector('#test-span')

      expect(span).not.to.be.undefined
    })
  })


  it('mounts portal when `mountTarget` prop is set')


  it('destroys mounted portalTarget when portal is destroyed')


})
