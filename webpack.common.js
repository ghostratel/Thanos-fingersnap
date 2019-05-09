
const { HTMLWebpackPlugins, entry } = require('./_build/genMultiEntry.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
module.exports = {
  entry: entry,
  output: {
    filename: 'js/[name]_[hash:5].js',
    chunkFilename: 'js/[name]_[contenthash:5].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'commons'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src']
          }
        }
      },
      {
        test: /\.(svg|jpe?g|gif|png|bmp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images',
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|ttf|woff2?|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'fonts'
          }
        }
      }
    ]
  },
  plugins: [
    ...HTMLWebpackPlugins,
    new VueLoaderPlugin()
  ]
}
