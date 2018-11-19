const { resolve } = require('path')

module.exports = function nuxtPortalVue(moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'portal-vue.js',
    moduleOptions
  })
}

module.exports.meta = require('../package.json')
