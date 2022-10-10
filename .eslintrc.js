module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
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
};
