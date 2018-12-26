const path = require('path')
module.exports = {
  input: {
    input: path.join(__dirname, './src/index.ts'),
    external: ['vue'],
  },
  output: {
    banner: require('./scripts/banner.js'),
    dir: path.join(__dirname, './dist'),
    file: '', // set in ./scripts/build
    format: '', // set in ./scripts/build
    name: '', // "
    globals: {
      /* set in scripts/build.js */
    },
  },
}
