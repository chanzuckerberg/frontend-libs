module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['storybook-static/', 'build/'],
  plugins: ['@typescript-eslint', 'testing-library', 'import', 'jest'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
  },
};
