import Vue from 'vue'
import VueRouter from 'vue-router'

import ToggleExample from './components/toggle/toggle-example.vue'
import TargetSwitch from './components/target-switch/target-switch.vue'
import SourceSwitch from './components/source-switch/source-switch.vue'
import Disabled from './components/disabled'
import CompAsRoot from './components/comp-as-root/comp-as-root.vue'
import Programmatic from './components/programmatic/index.vue'
import MountToExternal from './components/mount-to/mount-to-external.vue'
import EmptyPortal from './components/empty-portal/index.vue'
import DefaultSlotContent from './components/default-content-on-target/index.vue'
import Transitions from './components/transitions/transitions.vue'
import Multiple from './components/multiple/multiple.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/toggle',
  },
  {
    path: '/toggle',
    component: ToggleExample,
  },
  {
    path: '/target-switch',
    component: TargetSwitch,
  },
  {
    path: '/source-switch',
    component: SourceSwitch,
  },
  {
    path: '/disabled',
    component: Disabled,
  },
  {
    path: '/component-as-root-element',
    component: CompAsRoot,
  },
  {
    path: '/empty',
    component: EmptyPortal,
  },
  {
    path: '/programmatic',
    component: Programmatic,
  },
  {
    path: '/default-slot-content-for-target',
    component: DefaultSlotContent,
  },
  {
    path: '/transitions',
    component: Transitions,
  },
  {
    path: '/Mount-to-external-element',
    component: MountToExternal,
  },
  {
    path: '/multiple',
    component: Multiple,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export { routes, router as default }
