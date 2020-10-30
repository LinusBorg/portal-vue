// @ts-check

// TODO:
// * add strip plugin
const path = require('path')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2').default
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs').default
const resolve = require('rollup-plugin-node-resolve').default
const replace = require('rollup-plugin-replace').default
const alias = require('rollup-plugin-import-alias')
const analyzer = require('rollup-plugin-analyzer').default
const merge = require('merge')
const clone = require('clone-deep')
const chalk = require('chalk')
const rimraf = require('rimraf')
const { browser, name, main, module: moduleField } = require('../package.json')
const config = require('./rollup.config')

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
    'process.env.ROLLUP_BUILD_MODE': () =>
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

const filename = (str) => path.join(__dirname, '../', str)
const builds = {
  cjs: {
    output: {
      file: filename(browser),
      format: 'cjs',
      sourcemap: true,
    },
  },
  esm: {
    output: {
      file: filename(moduleField),
      format: 'esm',
      sourcemap: true,
    },
  },
  umd: {
    output: {
      file: filename(main),
      format: 'umd',
      name: 'PortalVue',
      globals: {
        vue: 'Vue',
      },
    },
  },
}

rimraf.sync('../dist/**')
rimraf.sync('../types/lib/**')

const logErr = (e) => {
  console.log(`⚠️ Build failed. An error occured:
  `)
  console.log(e)
}
const buildPromise = Object.keys(builds).reduce((promise, key) => {
  const mergedConfig = merge.recursive({}, clone(config), builds[key])
  console.log(`🏗 Building ${chalk.red(key)} version for ${name} ...
    `)

  const bundlePromise = promise.then(() => {
    process.env.ROLLUP_BUILD_MODE = key
    return rollup.rollup(mergedConfig.input).catch(logErr)
  })
  const writePromise = bundlePromise.then((bundle) => {
    return bundle.write(mergedConfig.output).catch(logErr)
  })

  return writePromise
}, Promise.resolve())

buildPromise
  .then(() => {
    console.log(`✅ Build successful.`)
  })

  .catch(logErr)
