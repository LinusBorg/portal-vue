import { App } from 'vue'
import MountingPortal from './components/mounting-portal'
import Portal from './components/portal'
import PortalTarget from './components/portal-target'
import {
  provideWormhole,
  useWormhole,
  wormholeSymbol,
} from './composables/wormhole'
import { Wormhole as TWormhole } from './types'
import { createWormhole, wormhole as defaultWormhole } from './wormhole'

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
  MountingPortal,
  useWormhole,
  provideWormhole,
  TWormhole,
  createWormhole,
}
