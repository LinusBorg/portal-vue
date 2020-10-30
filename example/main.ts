import { createApp, defineComponent, h, Transition, TransitionGroup } from 'vue'

import App from './components/App.vue'
import PortalContainer from './components/portal-container.vue'
import router from './router'

// import PortalVue from 'portal-vue'

import './styles/index.scss'

const PortalVue =
  process.env.NODE_ENV === 'production'
    ? require('../dist/portal-vue.common').default
    : require('../src/index.ts').default

// const Wormhole = require('../src/index.ts').Wormhole
// Wormhole.trackInstances = false

// Vue.config.productionTip = false

const app = createApp(App)

app.use(router)

app.use(PortalVue)

app.component('fade', (_, { slots }) => {
  return h(
    Transition,
    {
      mode: 'out-in',
      name: 'fade',
    },
    slots.default
  )
})

app.component('fadeGroup', (_, { slots }) => {
  return h(
    TransitionGroup,
    {
      name: 'fade',
    },
    slots.default
  )
})

app.component('container', PortalContainer)

app.mount('#app')
