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
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.css$/,
        //exclude: path.resolve(__dirname, "../node_modules"),
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
        include: path.resolve(__dirname,"../example")
      }
    ]
  },
  plugins: [
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
  devtool: 'inline-source-map',
  performance: {
    hints: false
  },
  devServer: {
    contentBase: 'example/',
    inline: true,
    hot: true,
    stats: {
      colors: true,
      chunks: false
    }
  }
}

module.exports = config
