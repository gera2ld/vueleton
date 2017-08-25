const path = require('path');
const IS_PRD = process.env.NODE_ENV === 'production';

module.exports = {
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
      const jsRule = config.module.rules.find(rule => rule.test.toString().includes('\\.js$'));
      jsRule.include = __dirname;
    },
    postcss: {
      parser: require('postcss-scss'),
      plugins: [
        require('precss'),
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
