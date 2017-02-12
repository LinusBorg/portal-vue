import Vue from 'vue'
import VuePortal from '../dist/vue-portal'
import './style.css'

import Navigation from './components/Navigation.vue'
Vue.use(VuePortal)

const nav = new Vue(Navigation)
nav.$mount('#leftnav')
