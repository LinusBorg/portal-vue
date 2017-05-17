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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        expect(wormhole.routes).to.deep.equal({
          target: {
            from: 'test-portal',
            to: 'target',
            passengers: ['Test'],
          },
        })
        resolve()
      }, 0)
    })
  })

  it('removes content on close()', function () {
    this.timeout(4000)
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      passengers: ['Test'],
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 0)
    })
    .then(() => {
      wormhole.close({
        from: 'test-portal',
        to: 'target',
      })

      return new Promise((resolve2, reject) => {
        setTimeout(() => {
          expect(wormhole.routes).to.deep.equal({ target: undefined })
          resolve2()
        }, 0)
      })
    })
  })

  it('the queue correctly executes sync close() before send() calls', () => {
    wormhole.open({
      from: 'test-portal',
      to: 'target',
      passengers: ['Test1'],
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wormhole.open({
          from: 'test-portal',
          to: 'target',
          passengers: ['Test2'],
        })
        wormhole.close({
          from: 'test-portal',
          to: 'target',
        })
        resolve()
      }, 0)
    })
    .then(() => {
      setTimeout(() => {
        expect(wormhole.routes).to.deep.equal({
          target: {
            from: 'test-portal',
            to: 'target',
            passengers: ['Test2'],
          },
        })
      }, 0)
    })
  })
})
