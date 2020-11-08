import { Slot, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import PortalTarget from '../../../src/components/portal-target'
import { wormholeSymbol } from '../../../src/composables/wormhole'
import { createWormhole, wormhole } from '../../../src/wormhole'

const createWormholeMock = () => {
  const wh = createWormhole(false)

  const open = jest.spyOn(wh, 'open')
  const close = jest.spyOn(wh, 'close')

  return wh
}
// Utils

function createWrapper(props = {}, options = {}) {
  const wh = createWormholeMock()
  return {
    wh,
    wrapper: mount(PortalTarget, {
      props: {
        name: 'target',
        ...props,
      } as any,
      global: {
        provide: {
          [(wormholeSymbol as unknown) as string]: wh,
        },
      },
      ...options,
    }),
  }
}

function generateSlotFn(text = '') {
  return (() => h('div', { class: 'testnode' }, text) as unknown) as Slot
}

describe('PortalTarget', () => {
  it('renders a single element for single vNode with slim prop & single slot element', async () => {
    const { wrapper, wh } = createWrapper()
    const content = generateSlotFn()
    wh.open({
      from: 'source',
      to: 'target',
      content,
    })

    await nextTick()

    expect(wrapper.html()).toBe('<div class="testnode"></div>')
  })

  it('renders slot content when no other content is available', function () {
    const { wrapper } = createWrapper(
      {},
      {
        slots: {
          default: `<p class="default">Test</p>`,
        },
      }
    )

    expect(wrapper.find('p.default')).toBe(true)
  })

  it('emits change event', async () => {
    const { wrapper, wh } = createWrapper()
    const content = generateSlotFn()
    wormhole.open({
      to: 'target',
      from: 'source',
      content,
    })

    await nextTick()

    expect(wrapper.emitted<any>().change[0]).toMatchObject({
      hasContent: true,
      sources: ['source'],
    })
  })

  /*

  it('emits change event when multiple is true', function () {
    const wrapper = createWrapper({ multiple: true })

    const vNodes = Object.freeze([generateSlotFn()[0], generateSlotFn()[0]])
    const newTransports = [
      {
        to: 'target',
        from: 'source',
        passengers: vNodes,
      },
      {
        to: 'target',
        from: 'source2',
        passengers: vNodes,
      },
    ]
    Vue.set(Wormhole.transports, 'target', newTransports)
    const newerTransports = newTransports.slice(0)
    newerTransports.push({ to: 'target', from: 'source3', passengers: vNodes })

    return wrapper.vm
      .$nextTick()
      .then(() => {
        expect(wrapper.emitted().change[0][0]).toEqual(true)

        Wormhole.transports['target'] = newerTransports

        return wrapper.vm.$nextTick()
      })
      .then(() => {
        expect(wrapper.emitted().change[1][0]).toEqual(true)
      })
  })

  */
})
