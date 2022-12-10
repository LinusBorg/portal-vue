import { describe, it, expect } from 'vitest'
import { Slot, h } from 'vue'
import { createWormhole } from '@/wormhole'

const createSlotFn = () => (() => h('div')) as unknown as Slot

describe('Wormhole', () => {
  it('correctly adds content on send', () => {
    const wormhole = createWormhole()
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      content: createSlotFn(),
    })

    expect(wormhole.transports.get('target')?.get('test-portal')).toEqual({
      from: 'test-portal',
      to: 'target',
      content: expect.any(Function),
      order: Infinity,
    })
  })

  it('removes content on close()', function () {
    const wormhole = createWormhole()
    const content = {
      from: 'test-portal',
      to: 'target',
      content: createSlotFn(),
      order: Infinity,
    }

    wormhole.open(content)
    expect(wormhole.transports.get('target')?.get('test-portal')).toMatchObject(
      content
    )

    wormhole.close({
      from: 'test-portal',
      to: 'target',
    })
    expect(
      wormhole.transports.get('target')?.get('test-portal')
    ).toBeUndefined()
  })

  it('only removes transports from the same source portal', () => {
    const wormhole = createWormhole()
    wormhole.open({
      from: 'test-portal1',
      to: 'target',
      content: createSlotFn(),
    })

    wormhole.open({
      from: 'test-portal2',
      to: 'target',
      content: createSlotFn(),
    })

    wormhole.close({
      from: 'test-portal1',
      to: 'target',
    })
    expect(wormhole.transports.get('target')?.get('test-portal2')).toBeDefined()
    expect(
      wormhole.transports.get('target')?.get('test-portal1')
    ).toBeUndefined()
  })

  it('returns latest transport when not called with `returnAll`', () => {
    const wormhole = createWormhole()
    wormhole.open({
      from: 'test-portal1',
      to: 'target',
      order: 2,
      content: createSlotFn(),
    })

    wormhole.open({
      from: 'test-portal2',
      to: 'target',
      order: 1,
      content: createSlotFn(),
    })

    const content = wormhole.getContentForTarget('target')
    const order = content.map((t) => t.order)
    expect(order).toMatchObject([1])
  })

  it('returns content for target properly sorted when multiple', () => {
    const wormhole = createWormhole()
    wormhole.open({
      from: 'test-portal1',
      to: 'target',
      order: 2,
      content: createSlotFn(),
    })

    wormhole.open({
      from: 'test-portal2',
      to: 'target',
      order: 1,
      content: createSlotFn(),
    })

    const content = wormhole.getContentForTarget('target', true)
    const order = content.map((t) => t.order)
    expect(order).toMatchObject([1, 2])
  })
})
