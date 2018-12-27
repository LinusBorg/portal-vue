/* eslint-env jest */

const transports = {}
const targets = {}
const sources = {}
export { transports }

const wormhole = {
  open: jest.fn().mockName('open'),
  close: jest.fn().mockName('close'),
  registerSource: jest.fn().mockName('registerSource'),
  unregisterSource: jest.fn().mockName('unregisterSource'),
  registerTarget: jest.fn().mockName('registerTarget'),
  unregisterTarget: jest.fn().mockName('registerTarget'),
  hasSource: jest.fn().mockName('hasSource'),
  hasTarget: jest.fn().mockName('hasTarget'),
  transports,
  targets,
  sources,
}

export { wormhole }
