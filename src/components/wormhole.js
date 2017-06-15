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
    if (keys.includes(to)) {
      this.transports[to] = transport
    } else {
      Vue.set(this.transports, to, transport)
    }
  }

  close (transport, force = false) {
    const { to, from } = transport
    if (!to || !from) return
    if (this.transports[to] && (force || this.transports[to].from === from)) {
      // this.transports[to] = undefined
      Vue.delete(this.transports, to)
    }
  }

  hasTarget (to) {
    return this.transports.hasOwnProperty(to)
  }

  hasContentFor (to) {
    return this.tranports[to] != null
  }

  getSourceFor (to) {
    return this.transports[to] && this.transports[to].from
  }

  getContentFor (to) {
    return this.transports[to]
  }

}
const wormhole = new Wormhole(transports)
export default wormhole
