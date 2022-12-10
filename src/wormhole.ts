import { reactive, readonly } from 'vue'
import type {
  Name,
  Transport,
  TransportCloser,
  TransportInput,
  TransportsHub,
  Wormhole,
} from './types'
import { inBrowser, stableSort } from './utils'

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

  function getContentForTarget(target: Name, returnAll?: boolean) {
    const transportsForTarget = transports.get(target)
    if (!transportsForTarget) return []

    const content = Array.from(transportsForTarget?.values() || [])

    if (!returnAll) {
      // return Transport that was added last
      return [content.pop()] as Transport[]
    }
    // return all Transports, sorted by their order property
    return stableSort(
      content,
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
