var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')

var devConfig = require('./webpack.conf.js')

var config = merge(devConfig, {
  entry: path.resolve(__dirname, '../test/index')
  output:{
    filename: 'testbundle.js',
    path: path.resolve(__dirname, '../test/unit')
  }
})

delete config.output.library
delete config.output.libraryTarget

module.exports config
