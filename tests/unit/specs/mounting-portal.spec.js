import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import PortalVue from '@/index'
import MountingPortal from '@/components/mounting-portal'
import { Portal } from '@/index'

jest.mock('@/components/wormhole')
const wormhole = require('@/components/wormhole').wormhole

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

describe('MountingPortal', () => {
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
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        mountTo: '#target',
        name: 'source',
        to: 'target',
        append: true,
        order: 1,
        tag: 'span',
      },
    })

    const portal = provider.find(Portal)

    expect(portal.vm.$props).toMatchObject({
      name: 'source',
      to: 'target',
      order: 1,
      tag: 'span',
    })
  })

  it('works with a portal in the scoped slot', () => {
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        mountTo: '#target',
      },
      scopedSlots: {
        manual: '<portal :to="props.to" name="X"><p>Test</p></portal>',
      },
    })
    expect(wormhole.open).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'X',
        to: provider.vm.to, // expect.any(String),
        passengers: expect.any(Array),
      })
    )
  })

  it('appends child to mountpoint', () => {
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        name: 'source',
        to: 'target',
        mountTo: '#target',
        append: true,
      },
      slots: {
        default: '<p>Test</p>',
      },
    })

    expect(provider.vm.portalTarget.$el.parentNode.id).toBe('target')
  })

  it('removes appended child on destroy', () => {
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        name: 'source',
        to: 'target',
        mountTo: '#target',
        append: true,
      },
      slots: {
        default: '<p>Test</p>',
      },
    })
    const el = document.querySelector('#target')
    expect(el.childNodes.length).toBe(1)
    provider.vm.$destroy()
    expect(el.childNodes.length).toBe(0)
  })

  it('allows to define the target name', () => {
    const name = 'CustomTarget'
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        mountTo: '#target',
        append: true,
        to: name,
        name: 'source',
      },
      slots: {
        default: '<p>Test</p>',
      },
    })
    expect(wormhole.open).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'source',
        to: name, // expect.any(String),
        passengers: expect.any(Array),
      })
    )
  })

  it('recycles an existing target if one wiht the same name is found', () => {
    const name = 'CustomTarget'
    wormhole.targets = {
      [name]: true,
    }
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        mountTo: '#target',
        append: true,
        to: name,
        name: 'source',
      },
      slots: {
        default: '<p>Test</p>',
      },
    })
    expect(wormhole.open).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'source',
        to: name, // expect.any(String),
        passengers: expect.any(Array),
      })
    )
  })

  it('bails when an existing target is found if bail is set', () => {
    const name = 'CustomTarget'
    wormhole.targets = {
      [name]: true,
    }
    const { provider } = mountComp(MountingPortal, {
      propsData: {
        mountTo: '#target',
        append: true,
        name: name,
        to: 'source',
        bail: true,
      },
      slots: {
        default: '<p>Test</p>',
      },
    })
    expect(wormhole.open).not.toHaveBeenCalled()
  })
})
