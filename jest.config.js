module.exports = {
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/test/index.ts'
  ],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  transform: {
    '\\.(vue)$': 'vue-jest',
    '\\.(sass|scss)$': 'jest-css-modules',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!vue-router)'],
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    // Default
    '**/test/**/*.js',
    '**/__tests__/**/*.spec.js',
    '**/__tests__/**/*.spec.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts'
  ]
}
