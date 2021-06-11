import path from 'path'
import vue from '@vitejs/plugin-vue'
import { version } from '../package.json'

export default {
  define: {
    'process.env.PORTAL_VUE_VERSION': JSON.stringify(version),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    alias: {
      'portal-vue': path.join(__dirname, '../src/index.ts'),
    },
  },
  plugins: [vue()],
}
