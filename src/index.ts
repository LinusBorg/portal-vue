import Portal from './components/portal'
import PortalTarget from './components/portal-target'
import MountingPortal from './components/mounting-portal'
import { wormhole as defaultWormhole } from './components/wormhole'
import { App } from 'vue'
import { Wormhole as TWormhole } from './types'
import { useWormhole, wormholeSymbol } from './composables/wormhole'

export interface PluginOptions {
  portalName?: string
  portalTargetName?: string
  MountingPortalName?: string
  wormhole?: TWormhole
}

function install(app: App, options: PluginOptions = {}) {
  app.component(options.portalName || 'Portal', Portal)
  app.component(options.portalTargetName || 'PortalTarget', PortalTarget)
  app.component(options.MountingPortalName || 'MountingPortal', MountingPortal)

  const wormhole = options.wormhole ?? defaultWormhole
  app.provide(wormholeSymbol, wormhole)
}

export default {
  install,
}

export const plugin = install

export { Portal, PortalTarget, MountingPortal, useWormhole }
export const Wormhole = defaultWormhole
