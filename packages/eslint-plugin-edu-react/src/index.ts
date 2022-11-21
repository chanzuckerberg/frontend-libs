import noCreateRefInFunctionComponent from './rules/no-create-ref-in-function-component';
import noUselessKey from './rules/no-useless-key';
import useEffectDepsPresence from './rules/use-effect-deps-presence';

const rules = {
  'no-create-ref-in-function-component': noCreateRefInFunctionComponent,
  'no-useless-key': noUselessKey,
  'use-effect-deps-presence': useEffectDepsPresence,
};

const recommendedConfig = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['@chanzuckerberg/edu-react', 'jsx-a11y', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@chanzuckerberg/edu-react/no-useless-key': 'error',
    '@chanzuckerberg/edu-react/use-effect-deps-presence': 'error',
    // TODO: Turn this rule on when it's released. It's not present in v6.6.1.
    'jsx-a11y/anchor-ambiguous-text': 'off',
    // Autofocus has its uses, and may be better than manually sending focus to an input field.
    'jsx-a11y/no-autofocus': 'off',
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
    'react/prop-types': 'off',
    // Don't enforce importing React just to use JSX. As of React 17 this is no longer needed.
    // See https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html. You do still
    // need to import React to use its hooks and types.
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        // Run no-create-ref-in-function-component only on .jsx or .tsx files to reduce the potential
        // for false positives.
        // prettier-ignore
        '@chanzuckerberg/edu-react/no-create-ref-in-function-component': 'error',
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
        // Turn off no-create-ref-in-function-component for tests, where it can be useful to create
        // refs with createRef.
        '@chanzuckerberg/edu-react/no-create-ref-in-function-component': 'off',
      },
    },
  ],
};

module.exports = {
  rules,
  configs: {
    recommended: recommendedConfig,
  },
};
