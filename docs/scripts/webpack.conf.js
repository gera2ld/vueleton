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
    path: resolve('dist'),
    filename: `${basename}.js`,
  },
  resolve: {
    modules: [
      resolve('node_modules'),
      resolve('../node_modules'),
    ],
    alias: {
      vueleton: resolve('..'),
    },
  },
  module: {
    rules: [
      {
        test: /\.esm\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: (m, c) => /node_modules/.test(m.context),
    }),
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
    vue: false,
    codemirror: false,
  },
}));

function resolve(...args) {
  return path.resolve(__dirname, '..', ...args);
}
