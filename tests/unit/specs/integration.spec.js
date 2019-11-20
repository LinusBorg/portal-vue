import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import PortalVue from '../../../src'
import { Portal, PortalTarget, Wormhole } from '../../../src'

async function waitTicks(n = 1) {
  let p = Promise.resolve()
  for (var i = 1; i <= n; i++) {
    p = p.then(() => Vue.nextTick())
  }
  return p
}

async function wait(ms) {
  return Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function mountScenario(Component, options = {}, all = false) {
  const localVue = options.localVue || createLocalVue()
  localVue.use(PortalVue)
  const wrapper = mount(Component, {
    ...options,
    localVue,
    sync: false,
  })
  const portal = wrapper[all ? 'findAll' : 'find'](Portal)
  const target = wrapper[all ? 'findAll' : 'find'](PortalTarget)
  return {
    wrapper,
    portal,
    target,
  }
}

describe('Integration Tests', () => {
  beforeEach(() => {
    const el = document.querySelector('#target')
    if (el) {
      el.parentNode.removeChild(el)
    }
    // ad a fresh version to the body
    const newEl = document.createElement('DIV')
    newEl.id = 'target'
    document.body.appendChild(newEl)

    Wormhole.transports = {}
    Wormhole.targets = {}
    Wormhole.sources = {}
  })

  it('Happy Path (Simplest scenario)', async () => {
    const component = require('../resources/HappyPath.vue').default
    const { wrapper, portal, target } = mountScenario(component)

    await waitTicks()
    const pArray = target.findAll('p')
    expect(pArray.at(0).text()).toBe('Test1')
    expect(pArray.at(1).text()).toBe('Test2')

    wrapper.setData({ show: true })

    await waitTicks()
    expect(wrapper.find('#additional').text()).toBe('Test3')
  })

  it('Scoped Slot (Happy Path)', async () => {
    const component = require('../resources/ScopedSlot.vue').default
    const { portal, target } = mountScenario(component)

    await waitTicks()
    expect(target.find('p').text()).toBe('Your message reads: Hi!')
  })

  it('Portal: Disabled', async () => {
    const component = require('../resources/PortalDisabled.vue').default
    const { wrapper, portal, target } = mountScenario(component)

    await waitTicks()
    expect(target.find('p').text()).toBe('Test')

    wrapper.vm.disabled = true

    await wrapper.vm.$nextTick()
    expect(target.contains('p')).toBe(false)
    expect(portal.find('p').text()).toBe('Test')
  })

  it('Portal: Disabled with Scoped Slot', async () => {
    const component = require('../resources/PortalDisabledScoped.vue').default
    const { portal } = mountScenario(component)

    await waitTicks()

    expect(portal.find('p').text()).toBe('Hi!')
  })

  it('Portal: Slim and disabled', async () => {
    const component = require('../resources/PortalSlim.vue').default
    const { portal } = mountScenario(component)

    await waitTicks()

    expect(portal.vm.slim).toBe(true)
    expect(portal.text()).toBe('Test')
    expect(portal.vm.$el.tagName).toBe('P')
  })

  it('Portal: Switch Target', async () => {
    const component = require('../resources/PortalSwitchTarget.vue').default
    const { wrapper, portal: portals, target: targets } = mountScenario(
      component,
      {},
      true
    )
    await waitTicks(2)

    expect(
      targets
        .at(0)
        .find('p')
        .text()
    ).toBe('Content')
    expect(targets.at(1).contains('p')).toBe(false)

    wrapper.vm.target = 'target2'

    await waitTicks(2)
    expect(
      targets
        .at(1)
        .find('p')
        .text()
    ).toBe('Content')
    expect(targets.at(0).contains('p')).toBe(false)
  })

  it('Target: Default content', async () => {
    const component = require('../resources/TargetDefaultContent.vue').default
    const { wrapper, target } = mountScenario(component)

    await waitTicks()
    expect(target.find('p').text()).toBe('Portal Content')

    wrapper.vm.disabled = true

    await waitTicks()
    expect(target.find('p').text()).toBe('Default Content')
  })

  it('Target: slim', async () => {
    const component = require('../resources/TargetSlim.vue').default
    const { portal, target } = mountScenario(component)

    await waitTicks()
    expect(target.is('p')).toBe(true)
    expect(target.text()).toBe('Content1')
  })

  it('Target: Multiple Portals', async () => {
    const component = require('../resources/TargetMultiple.vue').default
    const { wrapper, portal, target } = mountScenario(component)

    await waitTicks()
    const pWrapper = target.findAll('p')
    expect(pWrapper.length).toBe(2)
    expect(pWrapper.at(0).text()).toBe('Content2')
    expect(pWrapper.at(1).text()).toBe('Content1')
  })

  it('MountingPortal sets parent of PortalTarget to its parent', async () => {
    const spy = jest.fn()
    const Component = {
      template: `
      <div>
        <MountingPortal mountTo="#target" >
          <Child />
        </MountingPortal>
      </div>
      `,
      components: {
        Child: {
          template: `<div />`,
          created() {
            spy(this.$parent.$parent)
          },
        },
      },
    }
    const { wrapper } = mountScenario(Component)

    await Vue.nextTick()
    const parent = spy.mock.calls[0][0]
    expect(parent).toBeDefined()
    expect(spy.mock.calls[0][0]).toBe(wrapper.vm)
  })
})
