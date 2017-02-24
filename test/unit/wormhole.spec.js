/* global describe it beforeEach */
import { expect } from './helpers'
import { Wormhole } from '../../src/components/wormhole'

let wormhole

describe('Wormhole', function () {
  beforeEach(() => {
    wormhole = new Wormhole({})
  })

  it('correctly adds passengers on send', () => {
    wormhole.send('target', 'Test')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        expect(wormhole.routes).to.deep.equal({ target: 'Test' })
        resolve()
      }, 0)
    })
  })

  it('removes content on close()', () => {
    wormhole.send('target', 'Test')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 0)
    })
    .then(() => {
      wormhole.close('target')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          expect(wormhole.routes).to.deep.equal({ target: undefined })
          resolve()
        }, 0)
      })
    })
  })

  it('the queue correctly executes sync close() before send() calls', () => {
    wormhole.send('target', 'Test1')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wormhole.send('target', 'Test2')
        wormhole.close('target')
        resolve()
      }, 0)
    })
    .then(() => {
      setTimeout(() => {
        expect(wormhole.routes).to.deep.equal({ target: 'Test2' })
      }, 0)
    })
  })
})
