import Vue from 'vue'
import { freeze } from '../utils'
const transports = {}

export { transports }

export class Wormhole {
  constructor (transports) {
    this.transports = transports
    this.clearQueue = []
    this.updateQueue = []
    this.runScheduled = false
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

  close (transport) {
    const { to, from } = transport
    if (!to || !from) return
    if (transports[to] && transports[to].from === from) {
      transports[to] = undefined
      // Vue.delete(transports, to)
    }
  }

}
const wormhole = new Wormhole(transports)
export default wormhole
