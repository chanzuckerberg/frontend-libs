import { RuleTester } from 'eslint';
import rule from '../no-csf-v2';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-csf-v2', rule, {
  valid: [
    {
      // Object story.
      code: `
        export const Primary = {
          render: () => {},
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Arrow function in a non-story file.
      code: `
        export const Primary = () => {};
      `,
      filename: 'src/components/Button/Button.tsx',
    },
  ],
  invalid: [
    {
      // Arrow function.
      code: `
        export const Primary = () => {};
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'ExportNamedDeclaration' }],
    },
    {
      // Function expression.
      code: `
        export const Primary = function () {};
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'ExportNamedDeclaration' }],
    },
    {
      // Function declaration.
      code: `
        export function Primary() {}
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'ExportNamedDeclaration' }],
    },
  ],
});
