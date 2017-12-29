import Vue from 'vue'
import { mount, createLocalVue } from 'vue-test-utils'
import PortalVue from '../../../src/index'

const Wormhole = PortalVue.Wormhole

function waitTicks(n = 1) {
  let p = Promise.resolve()
  for (var i = 1; i <= n; i++) {
    p = p.then(() => Vue.nextTick())
  }
  return p
}

function mountScenario(Component, options = {}, all = false) {
  const localVue = options.localVue || createLocalVue()
  localVue.use(PortalVue)
  const wrapper = mount(Component, {
    ...options,
    localVue,
  })
  const portal = wrapper[all ? 'findAll' : 'find'](PortalVue.Portal)
  const target = wrapper[all ? 'findAll' : 'find'](PortalVue.PortalTarget)
  return {
    wrapper,
    portal,
    target,
  }
}

describe('Integration Tests', () => {
  beforeEach(() => {
    Wormhole.transports = {}
  })

  it('Happy Path (Simplest scenario)', () => {
    const component = require('../resources/HappyPath.vue')
    const { wrapper, ortal, target } = mountScenario(component)

    return waitTicks()
      .then(() => {
        const pArray = target.findAll('p')
        expect(pArray.at(0).text()).toBe('Test1')
        expect(pArray.at(1).text()).toBe('Test2')

        wrapper.vm.show = true
        return waitTicks()
      })
      .then(() => {
        expect(wrapper.find('#additional').text()).toBe('Test3')
      })
  })

  it('Scoped Slot (Happy Path)', () => {
    const component = require('../resources/ScopedSlot.vue')
    const { portal, target } = mountScenario(component)

    return waitTicks().then(() => {
      expect(target.find('p').text()).toBe('Your message reads: Hi!')
    })
  })

  it('Portal: Disabled', () => {
    const component = require('../resources/PortalDisabled.vue')
    const { portal, target } = mountScenario(component)

    return waitTicks()
      .then(() => {
        expect(target.find('p').text()).toBe('Test')

        portal.vm.disabled = true
        return portal.vm.$nextTick()
      })
      .then(() => {
        expect(target.contains('p')).toBe(false)
        expect(portal.find('p').text()).toBe('Test')
      })
  })

  it('Portal: Disabled with Scoped Slot', () => {
    const component = require('../resources/PortalDisabledScoped.vue')
    const { portal } = mountScenario(component)

    return waitTicks().then(() => {
      expect(portal.find('p').text()).toBe('Hi!')
    })
  })

  it('Portal: Slim and disabled', () => {
    const component = require('../resources/PortalSlim.vue')
    const { portal } = mountScenario(component)

    return waitTicks().then(() => {
      expect(portal.vm.$el.tagName).toBe('P')
      expect(portal.text()).toBe('Test')
    })
  })

  it('Portal: Switch Target', () => {
    const component = require('../resources/PortalSwitchTarget.vue')
    const { wrapper, portal: portals, target: targets } = mountScenario(
      component,
      {},
      true
    )
    return waitTicks(1)
      .then(() => {
        expect(
          targets
            .at(0)
            .find('p')
            .text()
        ).toBe('Content')
        expect(targets.at(1).contains('p')).toBe(false)

        wrapper.vm.target = 'target2'
      })
      .then(() => {
        expect(
          targets
            .at(1)
            .find('p')
            .text()
        ).toBe('Content')
        expect(targets.at(0).contains('p')).toBe(false)
      })
  })

  it('Target: Default content', () => {
    const component = require('../resources/TargetDefaultContent.vue')
    const { portal, target } = mountScenario(component)

    return waitTicks()
      .then(() => {
        expect(target.find('p').text()).toBe('Portal Content')

        portal.vm.disabled = true
        return waitTicks()
      })
      .then(() => {
        expect(target.find('p').text()).toBe('Default Content')
      })
  })

  it('Target: slim', () => {
    const component = require('../resources/TargetSlim.vue')
    const { portal, target } = mountScenario(component)

    return waitTicks().then(() => {
      expect(target.is('p')).toBe(true)
      expect(target.text()).toBe('Content1')
    })
  })

  it('Target: Multiple Portals', () => {
    const component = require('../resources/TargetMultiple.vue')
    const { wrapper, portal, target } = mountScenario(component)

    return waitTicks().then(() => {
      const pWrapper = target.findAll('p')
      expect(pWrapper.length).toBe(2)
      expect(pWrapper.at(0).text()).toBe('Content2')
      expect(pWrapper.at(1).text()).toBe('Content1')
    })
  })
})
