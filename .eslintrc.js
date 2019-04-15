module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
    require.resolve('@gera2ld/plaid-vue/eslint/vue'),
  ],
  rules: {
  },
  settings: {
    'import/core-modules': [
      'vue',
    ],
  },
}
