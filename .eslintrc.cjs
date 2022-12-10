module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@linusborg/eslint-config'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: ['*.cjs', '*.js', '*.mjs', '*.cts', '*.ts', '*.mts'],
      env: {
        node: true,
      },
    },
  ],
}
