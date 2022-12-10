import path from 'path'
import vue from '@vitejs/plugin-vue'
import { version } from '../package.json'

export default {
  define: {
    __PORTAL_VUE_VERSION__: JSON.stringify(version),
    __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    alias: {
      'portal-vue': path.join(__dirname, '../src/index.ts'),
    },
  },
  plugins: [vue()],
}
