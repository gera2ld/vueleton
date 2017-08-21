const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf');
const { styleRule } = require('./utils');
const DIST = 'lib';
const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
});

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  output: {
    path: resolve(DIST),
    publicPath: '',
    filename: '[name]/index.js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '#': resolve('src'),
    }
  },
  node: {
    // css-loader requires unnecessary `Buffer` polyfill,
    // which increases the bundle size significantly.
    // See:
    // - https://github.com/webpack-contrib/css-loader/issues/454
    // - https://github.com/vuejs/vue-loader/issues/720
    Buffer: false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('docs/src')]
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      styleRule({
        fallback: 'vue-style-loader',
        loaders: ['postcss-loader'],
      }),
    ],
  },
  devtool: false,
  plugins: [
    definePlugin,
  ],
  externals: {
    vue: 'vue',
    codemirror: 'codemirror',
  },
};
