/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  globals: {
    'ts-jest': {
      // Workaround for https://github.com/kulshekhar/ts-jest/issues/1648.
      tsconfig: 'tsconfig.base.json',
    },
  },

  // Pre-process TypeScript files with ts-jest.
  preset: 'ts-jest',

  // Test setup after the test environment has been installed.
  setupFilesAfterEnv: ['./jest.setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Glob patterns used to find tests. We've modified the default to only find files that have
  // `spec` or `test` in the filename. This allows us to put util files inside __tests__ directories
  // without jest thinking they're tests that should be ran.
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
