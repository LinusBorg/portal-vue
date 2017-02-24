import Vue from 'vue'

import App from './components/App.vue'

import './styles/index.css'

var PortalVue = process.env.NODE_ENV === 'production'
  ? require('../dist/portal-vue').default
  : require('../src').default

Vue.use(PortalVue)

new Vue({
  el: '#app',
  render: h => h(App),
})
