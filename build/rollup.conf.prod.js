import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

const pkg = require('../package.json')

const version = pkg.version

const babelConfig = {
  // runtimeHelpers: true,
  exclude: 'node_modules/**',
  plugins: ['external-helpers'],
}

const nodeResolveOptions = {
  module: true,
  jsnext: true,
  extensions: ['.js', '.vue'],
}

export default {
  input: './src/index.js',
  external: ['vue'],
  output: {
    banner: `/*
    portal-vue
    Version: ${version}
    Licence: MIT
    (c) Thorsten Lünborg
  */
  `,
    format: 'umd',
    file: './dist/portal-vue.js',
    name: 'PortalVue',
    globals: {
      vue: 'Vue',
    },
    sourcemap: true,
  },
  plugins: [babel(babelConfig), nodeResolve(nodeResolveOptions), commonjs()],
}
