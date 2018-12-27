import Vue from 'vue'
import { VueConstructor, PluginFunction } from 'vue'
import Portal from '@/components/portal'
import PortalTarget from '@/components/portal-target'
import PortalTargetProvider from '@/components/portal-target-provider'
import { wormhole as Wormhole } from '@/components/wormhole'

declare global {
  interface Window {
    Vue: VueConstructor
    ROLLUP_BUILD_MODE: string
  }
}

interface PluginOptions {
  portalName?: string
  portalTargetName?: string
  portalTargetProviderName?: string
}

function install(Vue: VueConstructor, options: PluginOptions = {}) {
  Vue.component(options.portalName || 'Portal', Portal)
  Vue.component(options.portalTargetName || 'PortalTarget', PortalTarget)
  Vue.component(
    options.portalTargetProviderName || 'PortalTargetProvider',
    PortalTargetProvider
  )
}
if (
  window.ROLLUP_BUILD_MODE === 'umd' &&
  typeof window !== 'undefined' &&
  window.Vue &&
  window.Vue === Vue
) {
  window.Vue.use({ install: install })
}

export default {
  install,
}

export { Portal, PortalTarget, PortalTargetProvider, Wormhole }
