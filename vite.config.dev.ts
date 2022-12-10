import path from 'path'
import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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

const old = defineConfig({
  define: {
    __PORTAL_VUE_VERSION__: JSON.stringify(version),
    __NODE_ENV__: '"development"',
  },
  plugins: [vue()],
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PortalVue',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        entryFileNames: `portal-vue.[format].dev`,
        banner: `
        /**
         *  Copyright ${new Date(Date.now()).getFullYear()} Thorsten Luenborg 
         *  @license MIT
         */`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
