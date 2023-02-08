import {RuleTester} from 'eslint';
import rule from '../no-p-tags';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
});

ruleTester.run('no-p-tags', rule, {
  valid: ['<Text size="body">Some text.</Text>'],

  invalid: [
    {
      code: '<p>Some text.</p>',
      errors: [
        {
          message:
            'Please use the <Text> component from the @chanzuckerberg/eds repo instead of a <p> tag 🥰',
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
});
