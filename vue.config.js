module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    const path = require('path')
    const { main } = require('./package.json')
    config.module.rule('js').exclude.add(path.join(__dirname, './dist'))
    config.module.rule('ts').exclude.add(path.join(__dirname, './dist'))

    config.resolve.alias.set(
      'portal-vue$',
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, './src/index')
        : path.join(__dirname, main /*'./dist/portal-vue.esm.js'*/)
    )
  },
}
