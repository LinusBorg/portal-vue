import path from 'path'
import { defineConfig, mergeConfig } from 'vite'
import { version } from './package.json'
import baseConfig from './vite.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    define: {
      __PORTAL_VUE_VERSION__: JSON.stringify(version),
      __NODE_ENV__: '"development"',
    },
    build: {
      minify: false,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'PortalVue',
        fileName: (format) =>
          `portal-vue.[format].dev.${format === 'es' ? 'mjs' : 'js'}`,
      },
    },
  })
)
