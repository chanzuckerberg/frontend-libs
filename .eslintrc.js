module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    '@chanzuckerberg/eslint-config-edu-js',
    '@chanzuckerberg/eslint-config-edu-ts',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
  ],
  ignorePatterns: ['storybook-static/', 'build/'],
  plugins: ['testing-library', 'jest'],
  rules: {
    // This lint rule is extremely useful, but does not seem to work in this repo... not sure why 😬
    // Is it because of the monorepo structure, and eslint can't tell that dev deps at the top level
    // should be importable by packages?
    'import/no-extraneous-dependencies': 'off',
  },
};
