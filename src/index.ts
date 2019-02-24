import Vue from 'vue'
import { VueConstructor } from 'vue'
import Portal from './components/portal'
import PortalTarget from './components/portal-target'
import MountingPortal from './components/mounting-portal'
import { wormhole as Wormhole } from './components/wormhole'

declare global {
  interface Window {
    Vue?: VueConstructor<Vue>
  }
}

export interface PluginOptions {
  portalName?: string
  portalTargetName?: string
  MountingPortalName?: string
}

function install(Vue: VueConstructor<Vue>, options: PluginOptions = {}) {
  Vue.component(options.portalName || 'Portal', Portal)
  Vue.component(options.portalTargetName || 'PortalTarget', PortalTarget)
  Vue.component(options.MountingPortalName || 'MountingPortal', MountingPortal)
}
if (
  // @ts-ignore
  process.env.ROLLUP_BUILD_MODE === 'umd' &&
  typeof window !== 'undefined' &&
  window.Vue &&
  window.Vue === Vue
) {
  window.Vue.use({ install: install })
}

export default {
  install,
}

export { Portal, PortalTarget, MountingPortal, Wormhole }
