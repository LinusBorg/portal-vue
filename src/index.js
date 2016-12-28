import Portal from './components/portal'
import PortalTarget from './components/portal-target'

function install(Vue, opts = {}) {

  Vue.component(opts.portalName || 'portal', Portal)
  Vue.component(opts.portalTargetName || 'portal-target', PortalTarget)
}

export default {
  install,
  Portal,
  PortalTarget
}
