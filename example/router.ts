import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ToggleExample from './components/toggle/toggle-example.vue'
import TargetSwitch from './components/target-switch/target-switch.vue'
import SourceSwitch from './components/source-switch/source-switch.vue'
import Disabled from './components/disabled/index.vue'
import ScopedSlots from './components/scoped-slots/index.vue'
import CompAsRoot from './components/comp-as-root/comp-as-root.vue'
import Programmatic from './components/programmatic/index.vue'
import RouterViewWithPortals from './components/router-view-with-portals/index.vue'
import RouterViewWithPortalsA from './components/router-view-with-portals/a.vue'
import RouterViewWithPortalsB from './components/router-view-with-portals/b.vue'
import MountToExternal from './components/mount-to/mount-to-external.vue'
import EmptyPortal from './components/empty-portal/index.vue'
import DefaultSlotContent from './components/default-content-on-target/index.vue'
import Transitions from './components/transitions/transitions.vue'
import Multiple from './components/multiple/multiple.vue'
import WrapperSlot from './components/wrapper-slot/WrapperSlot.vue'

const routes: RouteRecordRaw[] = [
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
    path: '/scoped',
    component: ScopedSlots,
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
    path: '/router-view-with-portals',
    component: RouterViewWithPortals,
    children: [
      { path: 'a', alias: '', component: RouterViewWithPortalsA },
      { path: 'b', component: RouterViewWithPortalsB },
    ],
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
  {
    path: '/wrapper-slot',
    component: WrapperSlot,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { routes, router as default }
