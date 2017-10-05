import Vue from 'vue'
import { combinePassengers, freeze } from '../utils'
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

    const currentIndex = this.getTransportIndex(transport)
    if (currentIndex === -1) {
      this.transports[to].push(transport)
    } else {
      this.transports[to][currentIndex] = transport
    }

    this.transports[to].sort(function (a, b) {
      console.log(a.order - b.order)
      return a.order - b.order
    })
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
    if (!this.transports[to]) {
      return false
    }
    return this.getContentFor(to).length > 0
  }

  getSourceFor (to) {
    return this.transports[to] && this.transports[to][0].from
  }

  getContentFor (to) {
    const transports = this.transports[to]
    if (!transports) {
      return undefined
    }
    return combinePassengers(transports)
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
