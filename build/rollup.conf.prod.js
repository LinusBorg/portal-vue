import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.js',
  external: ['vue'],
  globals: {
    vue: 'Vue',
  },
  format: 'umd',
  moduleName: 'VuePortal',
  dest: './dist/vue-portal.js', // equivalent to --output
  sourcemap: true,
  plugins: [
    nodeResolve({ module: true, jsnext: true }),
    commonjs(),
    buble({ objectAssign: 'Object.assign' }),
    vue(),
  ]
};
