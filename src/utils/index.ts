import { VNode } from 'vue'
import { Transport } from '../types'

export const inBrowser = typeof window !== 'undefined'

export function freeze<R>(item: R[]): ReadonlyArray<R> {
  if (Array.isArray(item) || typeof item === 'object') {
    return Object.freeze(item)
  }
  return item
}

export function combinePassengers(
  transports: Transport[],
  slotProps = {}
): Array<VNode> {
  return transports.reduce(
    (passengers, transport) => {
      const temp = transport.passengers[0]
      const newPassengers =
        typeof temp === 'function'
          ? (temp(slotProps) as VNode[])
          : (transport.passengers as VNode[])
      return passengers.concat(newPassengers)
    },
    [] as Array<VNode>
  )
}

export function stableSort<T>(array: T[], compareFn: Function) {
  return array
    .map((v: T, idx: number) => {
      return [idx, v] as [number, T]
    })
    .sort(function(a, b) {
      return compareFn(a[1], b[1]) || a[0] - b[0]
    })
    .map(c => c[1])
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key]
      }
      return acc
    },
    {} as Pick<T, K>
  )
}
