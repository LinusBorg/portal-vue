import { Wormhole } from '@/components/wormhole'
import Vue from 'vue'

let wormhole

describe('Wormhole', function() {
  beforeEach(() => {
    wormhole = new Wormhole({})
    wormhole.transports = {}
    wormhole.source = {}
    wormhole.targets = {}
  })

  it('correctly adds passengers on send', () => {
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
    })

    expect(wormhole.transports).toEqual({
      target: [
        {
          from: 'test-portal',
          to: 'target',
          passengers: ['Test'],
          order: Infinity,
        },
      ],
    })
  })

  it('removes content on close()', function() {
    const content = {
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
      order: Infinity,
    }

    wormhole.open(content)
    expect(wormhole.transports).toEqual({ target: [content] })

    wormhole.close({
      from: 'test-portal',
      to: 'target',
    })
    expect(wormhole.transports).toEqual({ target: [] })
  })

  it('only closes transports from the same source portal', () => {
    wormhole.open({
      from: 'test-portal1',
      to: 'target',
      passengers: ['Test1'],
    })

    wormhole.open({
      from: 'test-portal2',
      to: 'target',
      passengers: ['Test2'],
    })

    wormhole.close({
      from: 'test-portal1',
      to: 'target',
    })
    expect(wormhole.transports).toEqual({
      target: [
        {
          from: 'test-portal2',
          to: 'target',
          passengers: ['Test2'],
          order: Infinity,
        },
      ],
    })
  })

  it('closes all transports to the same target when force=true', () => {
    wormhole.open({
      from: 'test-portal1',
      to: 'target',
      passengers: ['Test1'],
    })

    wormhole.open({
      from: 'test-portal2',
      to: 'target',
      passengers: ['Test2'],
    })

    wormhole.close(
      {
        from: 'test-portal1',
        to: 'target',
      },
      true
    ) // force argument
    expect(wormhole.transports).toEqual({ target: [] })
  })

  it('removes content on close() when force=true and from=undefined', () => {
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
    })

    wormhole.close(
      {
        to: 'target',
      },
      true
    ) // force argument
    expect(wormhole.transports).toEqual({ target: [] })
  })

  it('closes all transports to the same target when force=true and from=undefined', () => {
    wormhole.open({
      from: 'test-portal1',
      to: 'target',
      passengers: ['Test1'],
    })

    wormhole.open({
      from: 'test-portal2',
      to: 'target',
      passengers: ['Test2'],
    })

    wormhole.close(
      {
        to: 'target',
      },
      true
    ) // force argument
    expect(wormhole.transports).toEqual({ target: [] })
  })

  it('hasTarget()', function() {
    const check1 = wormhole.hasTarget('target')
    expect(check1).toBe(false)

    wormhole.registerTarget('target', new Vue({}))
    const check2 = wormhole.hasTarget('target')
    expect(check2).toEqual(true)

    wormhole.unregisterTarget('target')
    const check3 = wormhole.hasTarget('target')
    expect(check3).toEqual(false)
  })

  it('hasSource()', function() {
    const check1 = wormhole.hasSource('source')
    expect(check1).toBe(false)

    wormhole.registerSource('source', new Vue({}))
    const check2 = wormhole.hasSource('source')
    expect(check2).toEqual(true)

    wormhole.unregisterSource('source')
    const check3 = wormhole.hasSource('source')
    expect(check3).toEqual(false)
  })

  it('hasContentFor() returns boolean depending on content', () => {
    expect(wormhole.hasContentFor('test')).toBe(false)
    wormhole.open({
      to: 'test',
      from: 'test-source',
      passengers: ['fakeVNode'],
    })
    expect(wormhole.hasContentFor('test')).toBe(true)
    wormhole.close({
      to: 'test',
      from: 'test-source',
    })
    expect(wormhole.hasContentFor('test')).toBe(false)
  })
})
