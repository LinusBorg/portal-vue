// workaround for an issues with vue-test-utils
const _proxy = window.Proxy
window.Proxy = undefined
const Vue = require('vue')
window.Proxy = _proxy

// import Vue from 'vue'

Vue.config.productionTip = false
