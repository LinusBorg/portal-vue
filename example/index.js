import Vue from 'vue'

var PortalVue = process.env.NODE_ENV === 'production'
  ? require('../dist/portal-vue').default
  : require('../src').default

import App from './components/App.vue'

import './styles/index.css'

Vue.use(PortalVue)

new Vue({
  el: '#app',
  render: h => h(App),
})
