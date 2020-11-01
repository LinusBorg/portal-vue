import { Wormhole } from '../types'
import { inject, InjectionKey, provide } from 'vue'

export const wormholeSymbol = Symbol('wormhole') as InjectionKey<Wormhole>

export function useWormhole() {
  const wh = inject(wormholeSymbol)

  if (!wh) {
    throw new Error(`
    [portal-vue]: Injection for 'wormhole' not found. 
    Are you sure you installed the plugin with 'app.use(plugin)'?`)
  }

  return wh
}

export function provideWormhole(wormhole: Wormhole) {
  provide(wormholeSymbol, wormhole)
}
