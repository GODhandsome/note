const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    haixue_login_modal: './src/index.js',
    vendor: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.less']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'post',
        use: [{
          loader: 'es3ify-loader',
        }],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }],
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              minimize: false
            }
          }, {
            loader: "less-loader",
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              minimize: false
            }
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader?limit=20000&name=images/[hash:8].[name].[ext]"
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.(woff|svg|eot|ttf)$/,
        use: [
          {
            loader: "url-loader?name=font/[hash:8].[name].[ext]"
          }
        ],
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './vendor.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      },
      output: {
        screw_ie8: false
      }
    })
  ]
}
