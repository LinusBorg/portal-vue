import Portal from './components/portal.vue'
import PortalTarget from './components/portal-target.vue'

function install (Vue, opts = {}) {
  Vue.component(opts.portalName || 'portal', Portal)
  Vue.component(opts.portalTargetName || 'portal-target', PortalTarget)
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: install })
}

export default {
  install,
  Portal,
  PortalTarget,
}
