import useEffectDepsPresence from './rules/use-effect-deps-presence';

const rules = {
  'use-effect-deps-presence': useEffectDepsPresence,
};

const recommendedConfig = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // prettier-ignore
    '@chanzuckerberg/eslint-plugin-edu-react/use-effect-deps-presence': 'warn',
    'jsx-a11y/anchor-ambiguous-text': 'error',
    // Enforce files with JSX are named wither .jsx or .tsx. This makes it easier for us to do
    // analysis on codebases (since we can find React components by looking at file extensions).
    'react/jsx-filename-extension': [
      'error',
      {allow: 'as-needed', extensions: ['.jsx', '.tsx']},
    ],
    'react/jsx-key': 'error',
    'react/jsx-no-undef': 'error',
    // Don't allow fragments with only a single child. The fragment isn't necessary in that case.
    // The only exception to this is a single expression (e.g. `<>{children}</>`), which is useful
    // when using TypeScript to convert a ReactNode to a ReactElement.
    'react/jsx-no-useless-fragment': ['error', {allowExpressions: true}],
    'react/jsx-sort-props': ['error', {ignoreCase: true}],
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/no-array-index-key': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-string-refs': 'error',
    // Don't enforce importing React just to use JSX. As of React 17 this is no longer needed.
    // See https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html. You do still
    // need to import React to use its hooks and types.
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};

export default {
  rules,
  configs: {
    recommended: recommendedConfig,
  },
};
