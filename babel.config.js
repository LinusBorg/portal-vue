module.exports = {
  presets: [['@vue/app', { useBuiltIns: false, polyfills: false }]],
  env: {
    test: {
      presets: [['@vue/app', { modules: 'commonjs', useBuiltIns: false }]],
    },
  },
}
