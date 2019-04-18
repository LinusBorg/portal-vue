import PortalVue from '../../dist/portal-vue.esm'
import VueResize from 'vue-resize'
import NoSsr from 'vue-no-ssr'
import KoFiButton from '@linusborg/vue-ko-fi-button'

export default ({ Vue }) => {
  Vue.use(PortalVue)
  Vue.use(VueResize)
  Vue.component('NoSsr', NoSsr)
  Vue.component('KoFiButton', KoFiButton)
  Vue.prototype.$__VERSION__ = process.env.VERSION

  if (typeof window !== 'undefined') {
    if (!document.querySelector('#message-target')) {
      const el = document.createElement('DIV')
      el.id = 'message-target'
      document.body.appendChild(el)
    }
  }
}
