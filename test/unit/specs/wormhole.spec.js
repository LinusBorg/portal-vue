import { Wormhole } from '@/components/wormhole'

let wormhole

describe('Wormhole', function() {
  beforeEach(() => {
    wormhole = new Wormhole({})
    wormhole.transports = {}
  })

  it('correctly adds passengers on send', () => {
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
      order: 0,
      class: ['class1', 'class2'],
    })

    expect(wormhole.transports).toEqual({
      target: [
        {
          from: 'test-portal',
          to: 'target',
          passengers: ['Test'],
          order: 0,
          class: ['class1', 'class2'],
        },
      ],
    })
  })

  it('removes content on close()', function() {
    const content = {
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
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

  it('hasTarget()', function() {
    const check1 = wormhole.hasTarget('target')
    expect(check1).toBe(false)

    wormhole.open({
      to: 'target',
      from: 'source',
      passengers: ['passenger1'],
    })
    const check2 = wormhole.hasTarget('target')
    expect(check2).toBe(true)
  })

  it('hasContentFor()', function() {
    const check1 = wormhole.hasContentFor('target')
    expect(check1).toBe(false)

    wormhole.open({
      to: 'target',
      from: 'source',
      passengers: ['passenger1'],
    })
    const check2 = wormhole.hasContentFor('target')
    expect(check2).toBe(true)
  })

  it('getSourceFor()', function() {
    const check1 = wormhole.getSourceFor('target')
    expect(check1).toBeUndefined()

    wormhole.open({
      to: 'target',
      from: 'source',
      passengers: ['passenger1'],
    })
    const check2 = wormhole.getSourceFor('target')
    expect(check2).toBe('source')
  })

  it('getContentFor()', function() {
    const check1 = wormhole.getContentFor('target')
    expect(check1).toBeUndefined()

    wormhole.open({
      to: 'target',
      from: 'source',
      passengers: ['passenger1'],
    })
    const check2 = wormhole.getContentFor('target')
    expect(check2).toEqual(['passenger1'])
  })
})
