import path from 'path'
import vue from '@vitejs/plugin-vue'
console.log('config')
export default {
  alias: {
    'portal-vue': path.join(__dirname, './portal-vue.esm.js'),
  },
  plugins: [vue()],
}
