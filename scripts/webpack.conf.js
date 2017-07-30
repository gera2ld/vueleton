const fs = require('fs');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.base.conf');
const { merge } = require('./utils');

const entry = fs.readdirSync('src')
.filter(item => fs.statSync(`src/${item}`).isDirectory())
.reduce((res, item) => Object.assign(res, { [item]: `#/${item}` }), {
  index: '#',
});

const targets = [];
module.exports = targets;

targets.push(merge(base, {
  entry,
  output: {
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
}));
