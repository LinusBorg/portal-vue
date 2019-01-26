import Vue from 'vue'
import { VueConstructor, PluginObject, PluginFunction } from 'vue'
import Portal from './lib/components/portal'
import PortalTarget from './lib/components/portal-target'
import MountingPortal from './lib/components/mounting-portal'
import { wormhole as Wormhole } from './lib/components/wormhole'

declare global {
  interface Window {
    Vue?: VueConstructor<Vue>
  }
}
export as namespace PortalVue

export interface PluginOptions {
  portalName?: string
  portalTargetName?: string
  MountingPortalName?: string
}

declare const _default: PluginFunction<PluginOptions>

export default _default
export { Portal, PortalTarget, MountingPortal, Wormhole }
