module.exports = {
  plugins: ['cypress', 'eslint-plugin-cypress'],
  env: {
    'cypress/globals': true
  },
  extends: ['plugin:cypress/recommended'],
  rules: {
    strict: 'off'
  }
}
