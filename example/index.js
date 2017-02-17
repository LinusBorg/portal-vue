import Vue from 'vue'
import VuePortal from '../src/index'
import App from './components/App.vue'

import './styles/index.css'

Vue.use(VuePortal)

new Vue({
  el: '#app',
  render: h => h(App),
})
