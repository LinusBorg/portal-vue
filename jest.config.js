module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.cjs',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  // snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testPathIgnorePatterns: ['<rootDir>/example', '<rootDir>/sr/index.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/example', '<rootDir>/src/index.ts'],
  watchPathIgnorePatterns: ['<rootDir>/example', '<rootDir>/src/index.ts'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
