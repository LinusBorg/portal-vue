const { resolve } = require('path')

module.exports = function nuxtPortalVue(options) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'portal-vue.js',
    options,
  })
}

module.exports.meta = require('../package.json')
