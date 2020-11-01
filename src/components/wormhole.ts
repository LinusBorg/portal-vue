import {
  TransportsHub,
  TransportInput,
  Transport,
  TransportCloser,
  Wormhole,
} from '@/types'
import { inBrowser, stableSort } from '@/utils'
import { computed, reactive, readonly } from 'vue'

export function createWormhole(): Wormhole {
  const transports: TransportsHub = reactive(new Map())

  function open(transport: TransportInput) {
    if (!inBrowser) return

    const { to, from, content, order = Infinity } = transport
    if (!to || !from || !content) return

    if (!transports.has(to)) {
      transports.set(to, new Map())
    }
    const transportsForTarget = transports.get(to)!

    const newTransport = {
      to,
      from,
      content,
      order,
    } as Transport

    transportsForTarget.set(from, newTransport)
  }

  function close(transport: TransportCloser) {
    const { to, from } = transport
    if (!to || !from) return
    const transportsForTarget = transports.get(to)
    if (!transportsForTarget) {
      return
    }
    transportsForTarget.delete(from)
    if (!transportsForTarget.size) {
      transports.delete(to)
    }
  }

  function getContentForTarget(target: string) {
    const transportsForTarget = transports.get(target)
    if (!transportsForTarget) return []

    return stableSort(
      Array.from(transportsForTarget?.values() || []),
      (a: Transport, b: Transport) => a.order - b.order
    )
  }

  return readonly({
    open,
    close,
    transports,
    getContentForTarget,
  }) as Wormhole
}

export const wormhole = createWormhole()
