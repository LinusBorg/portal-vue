// import plugin from 'portal-vue'
import DefaultTheme from 'vitepress/theme'
import components from '../components'
export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(components)
  },
}
