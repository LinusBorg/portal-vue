// @ts-check

// TODO:
// * add strip plugin
const path = require('path')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-import-alias')
const analyzer = require('rollup-plugin-analyzer').plugin
const merge = require('merge')
const chalk = require('chalk')
const rimraf = require('rimraf')
const config = require('../rollup.config')
const { version, name, main, module: moduleField } = require('../package.json')

process.env.VERSION = version

const plugins = [
  alias({
    '@/': path.join(process.cwd(), './src'),
  }),
  resolve(),
  commonjs(),
  typescript({
    typescript: require('typescript'),
    tsconfig: 'scripts/tsconfig.json',
    useTsconfigDeclarationDir: true,
    cacheRoot: './node_modules/.cache/rpt2_cache',
    clean: true,
  }),
  replace({
    'window.ROLLUP_BUILD_MODE': () =>
      JSON.stringify(process.env.ROLLUP_BUILD_MODE),
  }),
  babel({
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
    runtimeHelpers: true,
  }),
  analyzer({
    limit: 0,
    hideDeps: true,
  }),
]

config.input.plugins = (config.plugins || []).concat(plugins)

const filename = str => path.join(__dirname, '../', str)
const builds = {
  umd: {
    output: {
      file: filename('dist/portal-vue.umd.js'),
      format: 'umd',
      name: 'PortalVue',
      globals: {
        vue: 'Vue',
      },
    },
  },
  esm: {
    output: {
      file: filename(moduleField),
      format: 'esm',
      sourcemap: true,
    },
  },
  cjs: {
    output: {
      file: filename(main),
      format: 'cjs',
      sourcemap: true,
    },
  },
}

rimraf.sync('./dist/**')

const logErr = e => {
  console.log(`⚠️ Build failed. An error occured:
  `)
  console.log(e.stack)
}
const buildPromise = Object.keys(builds).reduce((promise, key) => {
  const mergedConfig = merge({}, config, builds[key])
  console.log(`🏗 Building ${chalk.red(key)} version for ${name} ...
    `)

  const bundlePromise = promise.then(() => {
    process.env.ROLLUP_BUILD_MODE = key
    return rollup.rollup(mergedConfig.input)
  })
  const writePromise = bundlePromise.then(bundle => {
    return bundle.write(mergedConfig.output)
  })

  return writePromise
}, Promise.resolve())

buildPromise
  .then(() => {
    console.log(`✅ Build successful.`)
  })

  .catch(logErr)
