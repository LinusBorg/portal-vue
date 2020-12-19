// import plugin from 'portal-vue'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import components from '../components'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(plugin)
    app.use(components)
  },
}
