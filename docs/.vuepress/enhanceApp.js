import PortalVue from '../../dist/portal-vue.esm'
import VueResize from 'vue-resize'
export default ({ Vue }) => {
  Vue.use(PortalVue)
  Vue.use(VueResize)
  Vue.prototype.$__VERSION__ = process.env.VERSION

  if (window) {
    if (!document.querySelector('#message-target')) {
      const el = document.createElement('DIV')
      el.id = 'message-target'
      document.body.appendChild(el)
    }
  }
}
