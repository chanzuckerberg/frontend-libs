module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint'],
  settings: {
    '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // Ensure types are always imported with `type`, so TypeScript completely removes the imports
    // and other tools don't need to figure out if they should be removed or not.
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {prefer: 'type-imports'},
    ],
    // Leave it up to the programmer to determine if a module export should have explicit types or
    // inferred ones.
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Allow `() => {}`. Useful for default props or arguments.
    '@typescript-eslint/no-empty-function': 'off',
    // Allow unused vars when using a ...rest property. This is a convenient way of omitting things
    // from the ...rest.
    '@typescript-eslint/no-unused-vars': [
      'error',
      {args: 'none', ignoreRestSiblings: true},
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // Allow `require(...)` in JS, since these are likely to be config, node, or Webpack.
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: [
        '*.spec.[jt]s',
        '*.spec.[jt]sx',
        '*.test.[jt]s',
        '*.test.[jt]sx',
        '*__tests__/*',
      ],
      rules: {
        // Allow non-null assertions (!) in test files. This makes testing more convenient in some cases,
        // and if something blows up the test will fail anyway.
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
