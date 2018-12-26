import Vue from 'vue'

import App from './components/App.vue'
import PortalContainer from './components/portal-container.vue'
import router from './router'

import './styles/index.scss'

var PortalVue =
  process.env.NODE_ENV === 'production'
    ? require('../dist/portal-vue.common').default
    : require('../src/index.ts').default

Vue.config.productionTip = false

Vue.use(PortalVue)

Vue.component('container', PortalContainer)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
