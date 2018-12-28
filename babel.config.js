module.exports = process.env.ROLL
  ? {
      presets: [['@babel/env', { modules: false, useBuiltIns: false }]],
      plugins: ['@babel/proposal-object-rest-spread', 'transform-vue-jsx'],
    }
  : {
      presets: ['@vue/app'],
      env: {
        test: {
          presets: [['@vue/app', { modules: 'commonjs', useBuiltIns: false }]],
        },
      },
    }
