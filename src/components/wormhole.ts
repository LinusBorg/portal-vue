import { Transports, Transport, TransportVector, Wormhole } from '@/types'
import { inBrowser, stableSort } from '@/utils'
import { computed, reactive, readonly } from 'vue'

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
      passengers,
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
      delete transports[to]
    } else {
      const index = currentTransports.findIndex((t) => t.from === from)
      if (index !== -1) {
        currentTransports.splice(index, 1)
        if ((currentTransports.length = 0)) {
          delete transports[to]
        }
      }
    }
  }

  const targets = computed(() => Object.keys(transports))
  const sources = computed(() =>
    Object.entries(transports).flatMap(([_, ts]) => ts.map((t) => t.from))
  )

  return readonly({
    open,
    close,
    transports,
    targets,
    sources,
  }) as Wormhole // TODO: fix weird Readonly type issue
}

export const wormhole = createWormhole()
