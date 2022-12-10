import { type InjectionKey, inject, provide } from 'vue'
import type { Wormhole } from '../types'

export const wormholeSymbol = Symbol('wormhole') as InjectionKey<Wormhole>

export function useWormhole() {
  const wh = inject(wormholeSymbol)

  if (!wh) {
    throw new Error(`
    [portal-vue]: Necessary Injection not found. Make sur you installed the plugin properly.`)
  }

  return wh
}

export function provideWormhole(wormhole: Wormhole) {
  provide(wormholeSymbol, wormhole)
}
