import path from 'path'
import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { version } from './package.json'
import baseConfig from './vite.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
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
    'process.env.PORTAL_VUE_VERSION': JSON.stringify(version),
    'process.env.NODE_ENV': '"development"',
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
