import { App, ComponentOptions, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { PluginOptions, install as PortalPlugin } from '../../../src'
import { createWormhole } from '../../../src'

const curriedPlugin = (options: PluginOptions = {}) => {
  const wormhole = createWormhole()
  return (app: App) => PortalPlugin(app, { ...options, wormhole })
}

async function mountScenario(
  Component: ComponentOptions,
  options: Record<any, any> = {}
) {
  const wrapper = mount(Component, {
    global: {
      ...options,
      plugins: [...(options.plugins || []), curriedPlugin()],
    },
  })
  const portals = wrapper.findAllComponents({ name: 'Portal' })
  const targets = wrapper.findAllComponents({ name: 'PortalTarget' })

  await nextTick()

  return {
    wrapper,
    portal: portals[0],
    target: targets[0],
    portals,
    targets,
  }
}

describe('Integration Tests', () => {
  beforeEach(() => {
    const el = document.querySelector('#target')
    if (el) {
      el.parentNode?.removeChild(el)
    }
    // ad a fresh version to the body
    const newEl = document.createElement('DIV')
    newEl.id = 'target'
    document.body.appendChild(newEl)
  })

  it('Happy Path (Simplest scenario)', async () => {
    const component = require('../resources/HappyPath.vue').default
    const { wrapper, target } = await mountScenario(component)

    const pArray = await target.findAll('p')
    expect(target.exists()).toBe(true)
    expect(pArray[0].text()).toBe('Test1')
    expect(pArray[1].text()).toBe('Test2')

    await wrapper.setData({ show: true })

    expect(wrapper.find('#additional').text()).toBe('Test3')
  })

  it('Scoped Slot (Happy Path)', async () => {
    const component = require('../resources/ScopedSlot.vue').default
    const { target } = await mountScenario(component)

    const p = await target.find('p')
    expect(p.text()).toBe('Your message reads: Hi!')
  })

  it('Portal: Disabled', async () => {
    const component = require('../resources/PortalDisabled.vue').default
    const { wrapper, portal, target } = await mountScenario(component)

    const p = await target.find('p')
    expect(p.text()).toBe('Test')

    await wrapper.setData({ disabled: true })

    const portalP = await portal.find('p')
    expect(target.find('p').exists()).toBe(false)
    expect(portalP.exists() && portalP.text()).toBe('Test')
  })
  it('Portal: Disabled with Scoped Slot', async () => {
    const component = require('../resources/PortalDisabledScoped.vue').default
    const { portal } = await mountScenario(component)

    expect(portal.find('p').text()).toBe('Hi!')
  })

  it('Portal: Switch Target', async () => {
    const component = require('../resources/PortalSwitchTarget.vue').default
    const { wrapper, portals, targets } = await mountScenario(component, {})

    expect(targets[0].find('p').text()).toBe('Content')
    expect(targets[1].find('p').exists()).toBe(false)

    await wrapper.setData({ target: 'target2' })

    expect(targets[1].find('p').text()).toBe('Content')
    expect(targets[0].find('p').exists()).toBe(false)
  })

  it('Target: Default content', async () => {
    const component = require('../resources/TargetDefaultContent.vue').default
    const { wrapper, target } = await mountScenario(component)

    expect(target.find('p').text()).toBe('Portal Content')

    await wrapper.setData({ disabled: true })

    expect(target.find('p').text()).toBe('Default Content')
  })

  it('Target: Multiple Portals', async () => {
    const component = require('../resources/TargetMultiple.vue').default
    const { target } = await mountScenario(component)

    const pWrapper = await target.findAll('p')
    expect(pWrapper.length).toBe(2)
    expect(pWrapper[0].text()).toBe('Content2')
    expect(pWrapper[1].text()).toBe('Content1')
  })

  it('works with mountPortalTarget feature', async () => {
    const component = require('../resources/PortalWithMountedTarget.vue')
      .default
    const el = document.createElement('DIV')
    el.id = 'external-target'
    document.body.appendChild(el)
    await mountScenario(component)

    expect(el.textContent).toBe('Test')
  })
})
