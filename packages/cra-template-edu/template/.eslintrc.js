module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    '@chanzuckerberg/eslint-plugin-edu-react',
    '@chanzuckerberg/eslint-plugin-stories',
    'prettier',
  ],
  extends: [
    '@chanzuckerberg/eslint-config-edu-js',
    '@chanzuckerberg/eslint-config-edu-ts',
    'plugin:@chanzuckerberg/eslint-plugin-edu-react/recommended',
    'plugin:@chanzuckerberg/eslint-plugin-stories/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['storybook-static/', 'build/'],
};
