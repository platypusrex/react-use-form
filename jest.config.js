module.exports = {
  globals: {
    "__DEV__": true
  },
  coveragePathIgnorePatterns: ['<rootDir>/test'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
