import { VueConstructor } from 'vue'
import Portal from './lib/components/portal'
import PortalTarget from './lib/components/portal-target'
import MountingPortal from './lib/components/mounting-portal'
import { wormhole as Wormhole } from './lib/components/wormhole'
declare global {
  interface Window {
    Vue?: VueConstructor
  }
}
interface PluginOptions {
  portalName?: string
  portalTargetName?: string
  MountingPortalName?: string
}
declare function install(Vue: VueConstructor, options?: PluginOptions): void
declare const _default: {
  install: typeof install
}
export default _default
export { Portal, PortalTarget, MountingPortal, Wormhole }
