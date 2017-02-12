var atImport = require('postcss-import')
var cssnext = require('cssnext')
module.exports = {
  plugins: [
    atImport(),
    cssnext(),
  ]
}
