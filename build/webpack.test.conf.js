var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')

var devConfig = require('./webpack.conf.js')


var config = merge(devConfig, {
  devtool: '#inline-source-map',
})

module.exports = config
