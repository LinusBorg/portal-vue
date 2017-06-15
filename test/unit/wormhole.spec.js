/* global describe it beforeEach */
import { expect } from './helpers'
import { Wormhole } from '../../src/components/wormhole'

let wormhole

describe('Wormhole', function () {
  beforeEach(() => {
    wormhole = new Wormhole({})
  })

  it('correctly adds passengers on send', () => {
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
    })

    expect(wormhole.transports).to.deep.equal({
      target: {
        from: 'test-portal',
        to: 'target',
        passengers: ['Test'],
      },
    })
  })

  it('removes content on close()', function () {
    this.timeout(4000)
    const content = {
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
    }

    wormhole.open(content)
    expect(wormhole.transports).to.deep.equal({ target: content })

    wormhole.close({
      from: 'test-portal',
      to: 'target',
    })
    expect(wormhole.transports).to.deep.equal({ })
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
    expect(wormhole.transports).to.deep.equal({
      target: {
        from: 'test-portal2',
        to: 'target',
        passengers: ['Test2'],
      },
    })
  })
})
