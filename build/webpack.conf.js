var path = require('path')
var webpack = require('webpack')

const config = {
  entry: {
      example: './example/index.js',
      vendor: ['vue'],
  },
  output: {
    path: path.resolve(__dirname, "../example"),
    publicPath: '/',
    library: 'VuePortal',
    libraryTarget: 'umd',
    filename: '[name].build.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve(__dirname,"../example")
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  devtool: 'source-map',
  performance: {
    hints: false
  },
  devServer: {
    contentBase: 'example/'
  }
}

module.exports = config
