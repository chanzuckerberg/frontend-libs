import {RuleTester} from 'eslint';
import rule from '../use-effect-deps-presence';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});

ruleTester.run('use-effect-deps-presence', rule, {
  valid: [
    {
      // useEffect with deps array
      code: `
        useEffect(() => {
          // ...
        }, []);
      `,
    },
    {
      // React.useEffect with deps array
      code: `
        React.useEffect(() => {
          // ...
        }, []);
      `,
    },
    {
      // Non-useEffect without deps array
      code: `
        useShmeffect(() => {
          // ...
        });
      `,
    },
  ],
  invalid: [
    {
      // useEffect without deps array
      code: `
        useEffect(() => {
          // ...
        });
      `,
      errors: [{type: 'CallExpression'}],
    },
    {
      // React.useEffect without deps array
      code: `
        React.useEffect(() => {
          // ...
        });
      `,
      errors: [{type: 'CallExpression'}],
    },
  ],
});
