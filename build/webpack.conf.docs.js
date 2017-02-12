var path = require('path')
var webpack = require('webpack')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = {
  entry: {
      app: './docs/index.js',
  },
  output: {
    path: path.resolve(__dirname, "../ghpages"),
    publicPath: '/',
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
        options: { objectAssign: 'Object.assign' },
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "../node_modules"),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.resolve(__dirname,"../docs")
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : "'development'"
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  devtool: 'source-map',
  performance: {
    hints: false
  },
  devServer: {
    contentBase: 'docs/',
    inline: true,
    hot: true,
    quiet: true,
    stats: {
      colors: true,
      chunks: false
    }
  }
}

module.exports = config
