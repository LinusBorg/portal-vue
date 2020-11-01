import Portal from './components/portal'
import PortalTarget, { PortalTargetContent } from './components/portal-target'
import MountingPortal from './components/mounting-portal'
import { wormhole as defaultWormhole } from './components/wormhole'
import { App } from 'vue'
import { Wormhole as TWormhole } from './types'
import {
  useWormhole,
  provideWormhole,
  wormholeSymbol,
} from './composables/wormhole'

export interface PluginOptions {
  portalName?: string
  portalTargetName?: string
  MountingPortalName?: string
  wormhole?: TWormhole
}

export function install(app: App, options: PluginOptions = {}) {
  app.component(options.portalName || 'Portal', Portal)
  app.component(options.portalTargetName || 'PortalTarget', PortalTarget)
  app.component(options.MountingPortalName || 'MountingPortal', MountingPortal)

  const wormhole = options.wormhole ?? defaultWormhole
  app.provide(wormholeSymbol, wormhole)
}

// alternative name for named import
export const plugin = install
export const Wormhole = defaultWormhole

export {
  Portal,
  PortalTarget,
  PortalTargetContent,
  MountingPortal,
  useWormhole,
  provideWormhole,
  TWormhole,
}
