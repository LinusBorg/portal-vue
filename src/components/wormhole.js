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

  close (transport) {
    const { to, from } = transport
    if (!to || !from) return
    if (this.transports[to] && this.transports[to].from === from) {
      this.transports[to] = undefined
    }
  }

}
const wormhole = new Wormhole(transports)
export default wormhole
