import Portal from './components/portal.js'
import PortalTarget from './components/portal-target.js'
import Wormhole from './components/wormhole.js'

function install(Vue, opts = {}) {
  Vue.component(opts.portalName || 'Portal', Portal)
  Vue.component(opts.portalTargetName || 'PortalTarget', PortalTarget)
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: install })
}

export default {
  install,
  Portal,
  PortalTarget,
  Wormhole,
}
