import Vue from 'vue'
import { combinePassengers, freeze, stableSort } from '../utils'
const transports = {}

export { transports }

export const Wormhole = Vue.extend({
  data: () => ({ transports }),
  methods: {
    open(transport) {
      const { to, from, passengers } = transport
      if (!to || !from || !passengers) return

      transport.passengers = freeze(passengers)
      const keys = Object.keys(this.transports)
      if (keys.indexOf(to) === -1) {
        Vue.set(this.transports, to, [])
      }

      const currentIndex = this.getTransportIndex(transport)
      // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
      const newTransports = this.transports[to].slice(0)
      if (currentIndex === -1) {
        newTransports.push(transport)
      } else {
        newTransports[currentIndex] = transport
      }
      this.transports[to] = stableSort(newTransports, function(a, b) {
        return a.order - b.order
      })
    },

    close(transport, force = false) {
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
          // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
          const newTransports = this.transports[to].slice(0)
          newTransports.splice(index, 1)
          this.transports[to] = newTransports
        }
      }
    },

    hasTarget(to) {
      return this.transports.hasOwnProperty(to)
    },

    hasContentFor(to) {
      if (!this.transports[to]) {
        return false
      }
      return this.getContentFor(to).length > 0
    },

    getSourceFor(to) {
      return this.transports[to] && this.transports[to][0].from
    },

    getContentFor(to) {
      const transports = this.transports[to]
      if (!transports) {
        return undefined
      }
      return combinePassengers(transports)
    },

    getTransportIndex({ to, from }) {
      for (const i in this.transports[to]) {
        if (this.transports[to][i].from === from) {
          return i
        }
      }
      return -1
    },
  },
})

const wormhole = new Wormhole(transports)
export default wormhole
