import { resolve } from 'path';

export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE || '/',
    head: {
      title: 'Vueleton',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap',
        rel: 'stylesheet',
      }],
    },
  },
  ssr: false,
  css: [
    'highlight.js/styles/github.css',
    '@/assets/default.css',
  ],
  alias: {
    vueleton: resolve(__dirname, '..'),
  },
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
      });
    },
    babel: {
      exclude: [
        resolve(__dirname, '../lib'),
        /node_modules/,
      ],
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
  webpack: {
    extractCSS: true,
  },
});
