import Vue from 'vue'
import { freeze } from '../utils'
const transports = {}

export { transports }

export class Wormhole {
  constructor (transports) {
    this.transports = transports
  }

  open (transport) {
    const { to, from, passengers } = transport
    if (!to || !from || !passengers) return

    transport.passengers = freeze(passengers)
    const keys = Object.keys(this.transports)
    if (keys.indexOf(to) === -1) {
      Vue.set(this.transports, to, [])
    }
    if (this.getTransportIndex(transport) === -1) {
      this.transports[to].push(transport)
    }
  }

  close (transport, force = false) {
    const { to, from } = transport
    if (!to || !from) return
    if (!this.transports[to]) {
      return
    }
    if (force) {
      this.transports[to] = []
    } else {
      const index = this.getTransportIndex(transport)
      if (index >= 0) {
        this.transports[to].splice(index, 1)
      }
    }
  }

  hasTarget (to) {
    return this.transports.hasOwnProperty(to)
  }

  hasContentFor (to) {
    /* eslint no-unneeded-ternary: 0 */
    return this.transports[to] && this.transports[to].passengers != null
      ? true
      : false
  }

  getSourceFor (to) {
    return this.transports[to] && this.transports[to].from
  }

  getContentFor (to) {
    const transport = this.transports[to]
    return transport ? transport.passengers : undefined
  }

  getTransportIndex ({ to, from }) {
    for (const i in this.transports[to]) {
      if (this.transports[to][i].from === from) {
        return i
      }
    }
    return -1
  }
}
const wormhole = new Wormhole(transports)
export default wormhole
