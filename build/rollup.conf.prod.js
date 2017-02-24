import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

const babelConfig = {
  // runtimeHelpers: true,
  exclude: 'node_modules/**',
}

const nodeResolveOptions = {
  module: true, jsnext: true,
  extensions: ['.js', '.vue'],
}

export default {
  entry: './src/index.js',
  external: ['vue'],
  globals: {
    vue: 'Vue',
  },
  format: 'umd',
  moduleName: 'PortalVue',
  dest: './dist/portal-vue.js', // equivalent to --output
  sourceMap: true,
  plugins: [
    nodeResolve(nodeResolveOptions),
    vue({ compileTemplate: false }),
    commonjs(),
    babel(babelConfig),
  ],
}
