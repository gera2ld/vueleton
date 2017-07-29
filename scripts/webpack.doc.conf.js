const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.base.conf');
const { merge } = require('./utils');

const IS_DEV = process.env.NODE_ENV === 'development';
const basename = IS_DEV ? '[name]' : '[name]-[chunkhash:8]';

const targets = [];
module.exports = targets;

targets.push(merge(base, {
  entry: {
    app: 'src/docs',
  },
  output: {
    path: path.resolve('docs'),
    filename: `${basename}.js`,
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Vueleton',
    }),
    new ExtractTextPlugin(`${basename}.css`),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  devtool: IS_DEV ? 'cheap-module-eval-source-map' : false,
}));
