import Portal from './components/portal.vue'
import PortalTarget from './components/portal-target.vue'

function install (Vue, opts = {}) {
  Vue.component(opts.portalName || 'portal', Portal)
  Vue.component(opts.portalTargetName || 'portal-target', PortalTarget)
}

export default {
  install,
  Portal,
  PortalTarget,
}

if (typeof window !== 'undefined' && window.Vue) {
  console.log('auto install!')
  window.Vue.use({ install })
}
