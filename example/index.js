import Vue from 'vue'
import VuePortal from '../src/index'
import App from './components/App.vue'

Vue.use(VuePortal)

var app = new Vue({
  el: '#app',
  render: h => h(App)
})
