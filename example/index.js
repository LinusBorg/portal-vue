import Vue from 'vue'

import App from './components/App.vue'

import './styles/index.css'

var PortalVue = process.env.NODE_ENV === 'production'
  ? require('../dist/portal-vue.js')
  : require('../src').default

console.log(`ENV:${process.env.NODE_ENV}`)

Vue.config.productionTip = false

Vue.use(PortalVue)

new Vue({
  el: '#app',
  render: h => h(App),
})
