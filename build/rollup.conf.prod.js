import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue'

export default {
  entry: './src/index.js',
  external: ['vue'],
  globals: {
    vue: 'Vue',
  },
  format: 'umd',
  moduleName: 'VuePortal',
  dest: './dist/vue-portal.js', // equivalent to --output
  plugins: [buble(),vue()]
};
