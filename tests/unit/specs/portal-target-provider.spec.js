import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import PortalVue from '@/index'
import PortalTargetProvider from '@/components/portal-target-provider'

jest.mock('@/components/wormhole')
// const PortalVue = require('@/index').default
// const PortalTargetProvider = require('@/components/portal-target-provider').default
const wormhole = require('@/components/wormhole').default

Vue.use(PortalVue)
function mountComp(component, opts) {
  const _Vue = createLocalVue()
  _Vue.use(PortalVue)

  const provider = mount(component, {
    ...opts,
    localVue: _Vue,
  })

  return {
    provider,
  }
}

describe('PortalTargetProvider', () => {
  beforeEach(() => {
    // remove the old element, if present
    const el = document.querySelector('#target')
    if (el) {
      el.parentNode.removeChild(el)
    }
    // ad a fresh version to the body
    const newEl = document.createElement('DIV')
    newEl.id = 'target'
    document.body.appendChild(newEl)

    wormhole.transports = {}
    wormhole.sources = {}
    wormhole.targets = {}
    wormhole.open.mockReset()
  })

  it('works', () => {
    const { provider } = mountComp(PortalTargetProvider, {
      propsData: {
        mountTo: '#target',
      },
      scopedSlots: {
        default: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })
    expect(wormhole.open).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'X',
        to: provider.vm.name, // expect.any(String),
        passengers: expect.any(Array),
      })
    )
  })

  it('appends child to mountpoint', () => {
    const { provider } = mountComp(PortalTargetProvider, {
      propsData: {
        mountTo: '#target',
        append: true,
      },
      scopedSlots: {
        default: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })

    expect(provider.vm.portalTarget.$el.parentNode.id).toBe('target')
  })

  it('removes appended child on destroy', () => {
    const { provider } = mountComp(PortalTargetProvider, {
      propsData: {
        mountTo: '#target',
        append: true,
      },
      scopedSlots: {
        default: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })
    const el = document.querySelector('#target')
    expect(el.childNodes.length).toBe(1)
    provider.vm.$destroy()
    expect(el.childNodes.length).toBe(0)
  })

  it('allows to define the target name', () => {
    const name = 'CustomTarget'
    const { provider } = mountComp(PortalTargetProvider, {
      propsData: {
        mountTo: '#target',
        append: true,
        name: name,
      },
      scopedSlots: {
        default: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })
    expect(wormhole.open).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'X',
        to: name, // expect.any(String),
        passengers: expect.any(Array),
      })
    )
  })
  it("doesn't overwrite an an existing target", () => {
    const name = 'CustomTarget'
    wormhole.targets = {
      [name]: true,
    }
    const { provider } = mountComp(PortalTargetProvider, {
      propsData: {
        mountTo: '#target',
        append: true,
        name: name,
      },
      scopedSlots: {
        default: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })
    expect(wormhole.open).not.toHaveBeenCalled()
  })

  it('allows to force overwrite an existing target', () => {
    const name = 'CustomTarget'
    wormhole.targets = {
      [name]: true,
    }
    const { provider } = mountComp(PortalTargetProvider, {
      propsData: {
        mountTo: '#target',
        append: true,
        name: name,
        force: true,
      },
      scopedSlots: {
        default: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })
    expect(wormhole.open).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'X',
        to: name, // expect.any(String),
        passengers: expect.any(Array),
      })
    )
  })
})
