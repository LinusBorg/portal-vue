import Vue from 'vue'
import { freeze, inBrowser, stableSort } from '../utils'
import {
  Transports,
  Transport,
  TransportInput,
  TransportVector,
  VMRegister,
} from '../types'

const transports: Transports = {}
const targets: VMRegister = {}
const sources: VMRegister = {}

export const Wormhole = Vue.extend({
  data: () => ({
    transports,
    targets,
    sources,
    trackInstances: inBrowser,
  }),
  methods: {
    open(transport: TransportInput) {
      if (!inBrowser) return
      const { to, from, passengers, order = Infinity } = transport
      if (!to || !from || !passengers) return

      const newTransport = {
        to,
        from,
        passengers: freeze<object>(passengers),
        order,
      } as Transport
      const keys = Object.keys(this.transports)

      if (keys.indexOf(to) === -1) {
        Vue.set(this.transports, to, [])
      }

      const currentIndex = this.$_getTransportIndex(newTransport)
      // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
      const newTransports = this.transports[to].slice(0)
      if (currentIndex === -1) {
        newTransports.push(newTransport)
      } else {
        newTransports[currentIndex] = newTransport
      }

      this.transports[to] = stableSort<Transport>(
        newTransports,
        (a: Transport, b: Transport) => a.order - b.order
      )
    },

    close(transport: TransportVector, force = false) {
      const { to, from } = transport
      if (!to || (!from && force === false)) return
      if (!this.transports[to]) {
        return
      }

      if (force) {
        this.transports[to] = []
      } else {
        const index = this.$_getTransportIndex(transport)
        if (index >= 0) {
          // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
          const newTransports = this.transports[to].slice(0)
          newTransports.splice(index, 1)
          this.transports[to] = newTransports
        }
      }
    },
    registerTarget(target: string, vm: Vue, force?: boolean): void {
      if (!inBrowser) return
      if (this.trackInstances && !force && this.targets[target]) {
        console.warn(`[portal-vue]: Target ${target} already exists`)
      }
      this.$set(this.targets, target, Object.freeze([vm]))
    },
    unregisterTarget(target: string) {
      this.$delete(this.targets, target)
    },
    registerSource(source: string, vm: Vue, force?: boolean): void {
      if (!inBrowser) return
      if (this.trackInstances && !force && this.sources[source]) {
        console.warn(`[portal-vue]: source ${source} already exists`)
      }
      this.$set(this.sources, source, Object.freeze([vm]))
    },
    unregisterSource(source: string) {
      this.$delete(this.sources, source)
    },
    hasTarget(to: string) {
      return !!(this.targets[to] && this.targets[to][0])
    },
    hasSource(to: string) {
      return !!(this.sources[to] && this.sources[to][0])
    },
    hasContentFor(to: string) {
      return !!this.transports[to] && !!this.transports[to].length
    },
    // Internal
    $_getTransportIndex({ to, from }: TransportVector): number {
      for (const i in this.transports[to]) {
        if (this.transports[to][i].from === from) {
          return +i
        }
      }
      return -1
    },
  },
})

const wormhole = new Wormhole(transports)
export { wormhole }
