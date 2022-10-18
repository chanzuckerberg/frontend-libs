import {
  AST_NODE_TYPES,
  ESLintUtils,
} from '@typescript-eslint/experimental-utils';
import rule from '../no-useless-key';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-useless-key', rule, {
  valid: [
    {
      // Keys in an array
      code: `
        function A() {
          return (
            <ul>
              {things.map((thing) => {
                return <li key={thing.id}>{thing.name}</li>;
              })}
            </ul>
          );
        }
      `,
    },
    {
      // No keys in a non-array
      code: `
        function A() {
          return (
            <ul>
              <li>Thing 1</li>
              <li>Thing 2</li>
            </ul>
          );
        }
      `,
    },
    {
      // No keys in a non-array
      code: `
        function A() {
          return (
            <div>
              <span>Thing</span>
            </div>
          );
        }
      `,
    },
    {
      // Non-key props
      code: `
        function A() {
          return (
            <div>
              <span disabled>Thing</span>
            </div>
          );
        }
      `,
    },
    {
      // const without a key
      code: `
        function A() {
          const foo = <span>hi</span>;
          return foo;
        }
      `,
    },
    {
      // Assignment without a key
      code: `
        function A() {
          let foo;
          foo = <span>hi</span>;
          return foo;
        }
      `,
    },
    {
      // FALSE NEGATIVE - const with a key
      code: `
        function A() {
          const foo = <span key="bye">hi</span>;
          return foo;
        }
      `,
    },
    {
      // FALSE NEGATIVE - Assignment with a key
      code: `
        function A() {
          let foo;
          foo = <span key="bye">hi</span>;
          return foo;
        }
      `,
    },
  ],
  invalid: [
    {
      // Multiple keys in a non-array
      code: `
        function A() {
          return (
            <ul>
              <li key="1">Thing 1</li>
              <li key="2">Thing 2</li>
            </ul>
          );
        }
      `,
      errors: [
        {type: AST_NODE_TYPES.JSXAttribute, messageId: 'uselessKey'},
        {type: AST_NODE_TYPES.JSXAttribute, messageId: 'uselessKey'},
      ],
      output: `
        function A() {
          return (
            <ul>
              <li >Thing 1</li>
              <li >Thing 2</li>
            </ul>
          );
        }
      `,
    },
    {
      // One key in a non-array
      code: `
        function A() {
          return (
            <div>
              <span key={thing}>Thing</span>
            </div>
          );
        }
      `,
      errors: [{type: AST_NODE_TYPES.JSXAttribute, messageId: 'uselessKey'}],
      output: `
        function A() {
          return (
            <div>
              <span >Thing</span>
            </div>
          );
        }
      `,
    },
  ],
});
