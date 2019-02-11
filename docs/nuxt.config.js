const path = require('path');
const IS_PRD = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'spa',
  head: {
    title: 'Vueleton',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  loading: { color: '#3B8070' },
  css: [
    '~/assets/default.css',
  ],
  build: {
    extend(config) {
      config.resolve.alias.vueleton = path.resolve(__dirname, '..');
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
      });
    },
    babel: {
      exclude: [
        path.resolve(__dirname, '../lib'),
        /node_modules/,
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
      ],
    },
    postcss: {
      parser: require('postcss-scss'),
      plugins: [
        require('precss'),
        require('postcss-color-function'),
        require('postcss-calc'),
      ],
    },
  },
};

if (IS_PRD) {
  Object.assign(module.exports, {
    router: {
      base: '/vueleton/',
    },
  });
  module.exports.build.extractCSS = true;
}
