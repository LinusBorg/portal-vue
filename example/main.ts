import { createApp, h, Transition, TransitionGroup } from 'vue'
import { install as PortalVuePlugin } from 'portal-vue'
import App from './components/App.vue'
import PortalContainer from './components/portal-container.vue'
import router from './router'

import './styles/index.scss'

const app = createApp(App)

app.use(router)

app.use(PortalVuePlugin)

app.component('fade', (_, { slots }) => {
  return h(
    Transition,
    {
      mode: 'out-in',
      name: 'fade',
      // appear: true,
    },
    slots.default
  )
})

app.component('fadeGroup', (_, { slots }) => {
  return h(
    TransitionGroup,
    {
      name: 'fade',
      tag: 'div',
    },
    slots.default
  )
})

app.component('container', PortalContainer)

app.mount('#app')
