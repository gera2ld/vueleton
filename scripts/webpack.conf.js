const fs = require('fs');
const path = require('path');
const util = require('util');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.conf');
const { merge } = require('./utils');

const entry = fs.readdirSync('src/components')
.filter(item => fs.statSync(`src/components/${item}`).isDirectory())
.reduce((res, item) => Object.assign(res, { [item]: `src/components/${item}` }), {});

const targets = [];
module.exports = targets;

targets.push(merge(base, {
  entry,
  plugins: [
    new FriendlyErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
}));

targets.push(merge(base, {
  entry: {
    index: 'src/components',
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
}));

targets.push(merge(base, {
  entry: {
    app: 'src/docs',
  },
  output: {
    path: path.resolve('docs'),
    libraryTarget: 'var',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Vueleton',
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  devtool: 'cheap-module-eval-source-map',
}));
