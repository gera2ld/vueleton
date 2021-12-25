module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
    require.resolve('@gera2ld/plaid-common-vue/eslint/vue3-js'),
  ],
  rules: {
    'no-constant-condition': 'off',
  },
}
