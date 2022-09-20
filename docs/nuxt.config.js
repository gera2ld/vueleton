const path = require('path');
const IS_PRD = process.env.NODE_ENV === 'production';

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'Vueleton',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  loading: { color: '#3B8070' },
  css: [
    'highlight.js/styles/github.css',
    '~/assets/default.css',
  ],
  build: {
    extend(config) {
      Object.assign(config.resolve.alias, {
        vue: require.resolve('vue'),
        vueleton: path.resolve(__dirname, '..'),
      });
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
    },
    postcss: {
      plugins: [
        require('postcss-nested'),
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
