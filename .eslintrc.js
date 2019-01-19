module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-console': ['error', {
      allow: ['error', 'warn'],
    }],
    'no-param-reassign': ['error', {
      props: false,
    }],
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'object-shorthand': ['error', 'always'],
    'no-mixed-operators': 'off',
    'no-bitwise': ['error', {int32Hint: true}],
    'no-underscore-dangle': 'off',
    'arrow-parens': 'off',
    'indent': ['error', 2, { MemberExpression: 0 }],
    'no-await-in-loop': 'off',
  },
}
