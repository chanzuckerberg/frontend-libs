/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Pre-process TypeScript files with ts-jest.
  preset: 'ts-jest',

  // Test setup after the test environment has been installed.
  setupFilesAfterEnv: ['./jest.setup.ts'],

  // The test environment that will be used for testing.
  testEnvironment: 'node',

  // Glob patterns used to find tests. We've modified the default to only find files that have
  // `spec` or `test` in the filename. This allows us to put util files inside __tests__ directories
  // without jest thinking they're tests that should be ran.
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  testEnvironmentOptions: {
    // Ensure we get CJS builds of packages with conditional exports, not ESM or browser builds.
    // Overrides jest-environment-jsdom's default value of 'browser' (see https://github.com/facebook/jest/blob/836157f4807893bb23a4758a60998fbd61cb184c/packages/jest-environment-jsdom/src/index.ts#L40).
    // Without this, we get the browser builds of the @remix-run/web-* packages, which don't work
    // because our tests run in Node.
    customExportConditions: ['require'],
  },

  // Paths to skip.
  testPathIgnorePatterns: [
    // Skip the "tests" generated as part of cra-template-edu. They're not intended to run as part
    // of this repo's test suite, and would require much more setup to work here.
    '<rootDir>/packages/cra-template-edu/template/',
    // There shouldn't be any, but ignore any tests that sneak into build directories.
    '<rootDir>/packages/.+/build/',
  ],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Workaround for https://github.com/kulshekhar/ts-jest/issues/1648.
        tsconfig: 'tsconfig.base.json',
      },
    ],
  },
};
