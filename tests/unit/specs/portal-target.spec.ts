import { Slot, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import PortalTarget from '../../../src/components/portal-target'
import { wormholeSymbol } from '../../../src/composables/wormhole'
import { createWormhole } from '../../../src/wormhole'

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

    expect(wrapper.html()).toBe(
      `<div style="display: none;"></div>
<div class="testnode"></div>`
    )
  })

  it('renders slot content when no other content is available', function () {
    const { wrapper } = createWrapper(
      {},
      {
        slots: {
          default: h('p', { class: 'default' }, 'Test'),
        },
      }
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('p.default').exists()).toBe(true)
  })

  it('emits change event', async () => {
    const { wrapper, wh } = createWrapper()

    await nextTick()

    const content = generateSlotFn()
    wh.open({
      to: 'target',
      from: 'source',
      content,
    })

    await nextTick()

    expect(wrapper.emitted<any>().change[0]).toMatchObject([
      {
        hasContent: true,
        sources: ['source'],
      },
    ])
  })
})
