import MountingPortal from '@/components/mounting-portal'
import { createWormhole, plugin as PortalPlugin, PluginOptions } from '@/index'
import { mount } from '@vue/test-utils'
import { App, nextTick } from 'vue'

const curriedPlugin = (options: PluginOptions = {}) => {
  const wormhole = createWormhole()
  return (app: App) => PortalPlugin(app, { ...options, wormhole })
}

async function mountComp(component: any, opts: Record<string, any> = {}) {
  const wrapper = mount(component, {
    ...opts,
    global: {
      plugins: [...(opts.plugins || []), curriedPlugin()],
    },
  })

  await nextTick()

  return {
    wrapper,
  }
}

describe('MountingPortal', () => {
  beforeEach(() => {
    // remove the old element, if present
    const el = document.querySelector('#target')
    if (el) {
      el.parentNode?.removeChild(el)
    }
    // ad a fresh version to the body
    const newEl = document.createElement('DIV')
    newEl.id = 'target'
    document.body.appendChild(newEl)
  })

  it.only('works', async () => {
    const { wrapper } = await mountComp(MountingPortal, {
      propsData: {
        name: 'source',
        to: 'target',
        mountTo: '#target',
      },
      slots: {
        default: '<p>Test</p>',
      },
    })

    const el = document.querySelector('#target >  div > p') as HTMLEmbedElement

    expect(el).toBeDefined()
    expect(el.textContent).toBe('Test')
  })

  it('removes appended child on destroy', async () => {
    const { wrapper } = await mountComp(MountingPortal, {
      propsData: {
        name: 'source',
        to: 'target',
        mountTo: '#target',
      },
      slots: {
        default: '<p>Test</p>',
      },
    })
    const el = document.querySelector('#target')
    expect(el?.childNodes.length).toBe(1)
    wrapper.unmount()
    expect(el?.childNodes.length).toBe(0)
  })

  it('allows to define the target name', async () => {
    const name = 'CustomTarget'
    const { wrapper } = await mountComp(MountingPortal, {
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

    const target = wrapper.findComponent({ name: 'PortalTarget' })
    expect(target.props()).toMatchObject({
      name: 'target',
      multiple: true,
    })
  })
})
