const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('../../scripts/webpack.base.conf');
const { merge } = require('../../scripts/utils');

const IS_DEV = process.env.NODE_ENV !== 'production';
const basename = IS_DEV ? '[name]' : '[name]-[chunkhash:8]';

const targets = [];
module.exports = targets;

targets.push(merge(base, {
  entry: {
    app: './src',
  },
  output: {
    path: path.resolve('dist'),
    filename: `${basename}.js`,
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve('../node_modules'),
    ],
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
  externals: {
    codemirror: false,
  },
}));
