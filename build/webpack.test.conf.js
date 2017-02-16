var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')

var devConfig = require('./webpack.conf.js')

delete devConfig.entry
delete devConfig.output

var config = merge(devConfig, {
  entry: {
    testbundle: path.resolve(__dirname, '../test/index'),
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../test/unit')
  },
  devtool: '#inline-source-map',
})

config.devServer.port = 8081
config.devServer.contentBase = 'test/unit/'


module.exports = config
