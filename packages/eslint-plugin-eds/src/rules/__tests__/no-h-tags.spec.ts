import {RuleTester} from 'eslint';
import rule from '../no-h-tags';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
});

ruleTester.run('no-h-tags', rule, {
  valid: [
    '<Heading size="h1">Some Heading</Heading>',
    '<Heading as="h3" size="h2">Some Heading</Heading>',
  ],

  invalid: [
    {
      code: '<h1>Some Heading</h1>',
      errors: [
        {
          message:
            'Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <h1> tag 💕',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: '<h2>Some Heading</h2>',
      errors: [
        {
          message:
            'Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <h2> tag 💕',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: '<h3>Some Heading</h3>',
      errors: [
        {
          message:
            'Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <h3> tag 💕',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: '<h4>Some Heading</h4>',
      errors: [
        {
          message:
            'Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <h4> tag 💕',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: '<h5>Some Heading</h5>',
      errors: [
        {
          message:
            'Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <h5> tag 💕',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: '<h6>Some Heading</h6>',
      errors: [
        {
          message:
            'Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <h6> tag 💕',
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
});
