import { describe, it, test, expect, vi } from 'vitest'
import { type Slot, h, nextTick, type VNode } from 'vue'
import { mount } from '@vue/test-utils'
import PortalTarget from '../components/portal-target'
import { wormholeSymbol } from '../composables/wormhole'
import { createWormhole } from '../wormhole'

const createWormholeMock = () => {
  const wh = createWormhole(false)

  vi.spyOn(wh, 'open')
  vi.spyOn(wh, 'close')

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
          [wormholeSymbol as unknown as string]: wh,
        },
      },
      ...options,
    }),
  }
}

function generateSlotFn(text = '') {
  return (() => [h('div', { class: 'testnode' }, text) as unknown]) as Slot
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

    expect(wrapper.html()).toMatchInlineSnapshot(
      `
      "<div style=\\"display: none;\\"></div>
      <div class=\\"testnode\\"></div>"
    `
    )
  })

  it('renders default slot content when no other content is available', function () {
    const { wrapper } = createWrapper(
      {},
      {
        slots: {
          default: () => [h('p', { class: 'default' }, 'Test')],
        },
      }
    )
    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<p class=\\"default\\">Test</p>"'
    )
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

  describe('Wrapper slots', () => {
    test('v-slot:itemWrapper', async () => {
      const { wrapper, wh } = createWrapper(
        {
          multiple: true,
        },
        {
          slots: {
            itemWrapper: (nodes: VNode[]) => [
              h('div', { class: 'itemWrapper' }, nodes),
            ],
          },
        }
      )
      wh.open({
        from: 'source1',
        to: 'target',
        content: () => [
          h('div', { class: 'testnode' }, 'source1-1'),
          h('div', { class: 'testnode' }, 'source1-2'),
        ],
      })
      wh.open({
        from: 'source2',
        to: 'target',
        content: generateSlotFn('source2'),
      })

      await nextTick()

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div style=\\"display: none;\\"></div>
        <div class=\\"itemWrapper\\">
          <div class=\\"testnode\\">source1-1</div>
        </div>
        <div class=\\"itemWrapper\\">
          <div class=\\"testnode\\">source1-2</div>
        </div>
        <div class=\\"itemWrapper\\">
          <div class=\\"testnode\\">source2</div>
        </div>"
      `)
    })

    test('v-slot:sourceWrapper', async () => {
      const { wrapper, wh } = createWrapper(
        {
          multiple: true,
        },
        {
          slots: {
            sourceWrapper: (nodes: VNode[]) => [
              h('div', { class: 'sourceWrapper' }, nodes),
            ],
          },
        }
      )
      wh.open({
        from: 'source1',
        to: 'target',
        content: generateSlotFn('source1'),
      })
      wh.open({
        from: 'source2',
        to: 'target',
        content: generateSlotFn('source2'),
      })

      await nextTick()

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div style=\\"display: none;\\"></div>
        <div class=\\"sourceWrapper\\">
          <div class=\\"testnode\\">source1</div>
        </div>
        <div class=\\"sourceWrapper\\">
          <div class=\\"testnode\\">source2</div>
        </div>"
      `)
    })

    test('v-slot:outerWrapper', async () => {
      const { wrapper, wh } = createWrapper(
        {
          multiple: true,
        },
        {
          slots: {
            outerWrapper: (nodes: VNode[]) => [
              h('div', { class: 'outerWrapper' }, nodes),
            ],
          },
        }
      )
      wh.open({
        from: 'source1',
        to: 'target',
        content: generateSlotFn('source1'),
      })
      wh.open({
        from: 'source2',
        to: 'target',
        content: generateSlotFn('source2'),
      })

      await nextTick()

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div style=\\"display: none;\\"></div>
        <div class=\\"outerWrapper\\">
          <div class=\\"testnode\\">source1</div>
          <div class=\\"testnode\\">source2</div>
        </div>"
      `)
    })
  })
})
