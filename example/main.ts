import Vue from 'vue'

import App from './components/App.vue'
import PortalContainer from './components/portal-container.vue'
import router from './router'

// import PortalVue from 'portal-vue'

import './styles/index.scss'

var PortalVue =
  process.env.NODE_ENV === 'production'
    ? require('../dist/portal-vue.common').default
    : require('../src/index.ts').default

// const Wormhole = require('../src/index.ts').Wormhole
// Wormhole.trackInstances = false

Vue.config.productionTip = false

Vue.use(PortalVue)

Vue.component(
  'fade',
  Vue.extend({
    functional: true,
    render: (h, { children }) => {
      return h(
        'transition',
        {
          props: {
            mode: 'out-in',
            name: 'fade',
          },
        },
        children
      )
    },
  })
)

Vue.component(
  'fadeGroup',
  Vue.extend({
    functional: true,
    render: (h, { children }) => {
      return h(
        'transition-group',
        {
          props: {
            name: 'fade',
          },
        },
        children
      )
    },
  })
)

Vue.component('container', PortalContainer)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
