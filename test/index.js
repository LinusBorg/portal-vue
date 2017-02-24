/**
 * See /build/webpack.test.conf.js for info how this is run.
 */

 /* additional setup with other loaders (polyfills, ...)*/
import 'mocha-css'

const context = require.context('./unit', true, /\.spec.js$/)
context.keys().forEach(context)
