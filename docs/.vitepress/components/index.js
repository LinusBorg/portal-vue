import Hero from './Hero.vue'
import Badge from './Badge.vue'
// import ResizeObserver from './ResizeObserver/ResizeObserver.vue'
export default function components(app) {
  // app.component('ResizeObserver', ResizeObserver)
  app.component('Hero', Hero)
  app.component('Badge', Badge)
}
