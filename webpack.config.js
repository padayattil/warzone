const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env, argv) {
  const isDevMode = argv.mode !== 'production'

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: path.join('images/[name].[ext]'),
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name:'[name].[ext]',
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src/index.html')}),
      new HtmlWebpackPlugin({
        filename: 'tutorial.html',
        template: path.resolve(__dirname, 'src/tutorial.html')
      }),
      new HtmlWebpackPlugin({
        filename: 'game.html',
        template: path.resolve(__dirname, 'src/game.html')
      }),
      new MiniCssExtractPlugin({filename: 'bundle.css'})
    ]
  };
}
