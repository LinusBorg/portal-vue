import {
  TransportsHub,
  TransportInput,
  Transport,
  TransportCloser,
  Wormhole,
  Name,
} from '@/types'
import { inBrowser, stableSort } from '@/utils'
import { reactive, readonly } from 'vue'

export function createWormhole(asReadonly = true): Wormhole {
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

  function getContentForTarget(target: Name) {
    const transportsForTarget = transports.get(target)
    if (!transportsForTarget) return []

    return stableSort(
      Array.from(transportsForTarget?.values() || []),
      (a: Transport, b: Transport) => a.order - b.order
    )
  }

  const wh: Wormhole = {
    open,
    close,
    transports,
    getContentForTarget,
  }
  return asReadonly ? (readonly(wh) as Wormhole) : wh
}

export const wormhole = createWormhole()
