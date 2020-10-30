import { Transports, Transport, TransportVector, Wormhole } from '@/types'
import { inBrowser, stableSort } from '@/utils'
import { reactive, readonly } from 'vue'

export function createWormhole(): Wormhole {
  const transports: Transports = reactive({})

  function open(transport: Transport) {
    if (!inBrowser) return

    const { to, from, passengers, order = Infinity } = transport
    if (!to || !from || !passengers) return

    if (!transports[to]) {
      transports[to] = []
    }

    const currentTransports = Array.from(transports[to])

    const newTransport = {
      to,
      from,
      passengers, // TODO: markRaw?
      order,
    } as Transport

    const index = currentTransports.findIndex((t) => t.from === from)
    if (index === -1) {
      currentTransports.push(newTransport)
    } else {
      currentTransports[index] = newTransport
    }

    transports[to] = stableSort<Transport>(
      currentTransports,
      (a: Transport, b: Transport) => a.order - b.order
    )
  }
  function close(transport: TransportVector, force = false) {
    const { to, from } = transport
    if (!to || (!from && force === false)) return
    const currentTransports = transports[to]
    if (!currentTransports) {
      return
    }

    if (force) {
      transports[to] = []
    } else {
      const index = currentTransports.findIndex((t) => t.from === from)
      if (index !== -1) {
        currentTransports.splice(index, 1)
      }
    }
  }

  return readonly({
    open,
    close,
    transports,
  }) as Wormhole // TODO: fix weird Readonly type issue
}

export const wormhole = createWormhole()
