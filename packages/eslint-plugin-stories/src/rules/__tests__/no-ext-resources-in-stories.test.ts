import { RuleTester } from 'eslint';
import rule from '../no-ext-resources-in-stories';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-ext-resources-in-stories', rule, {
  valid: [
    {
      // Contains http in string
      code: `
        export const LINK = "http://google.com/cool-site";
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
  ],
  invalid: [
    {
      // Contains png file.
      code: `
        export const IMAGE = "http://google.com/image.png";
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Literal' }],
    },
    {
      // Contains jpg in string.
      code: `
        export const IMAGE = "http://google.com/image.jpg";
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Literal' }],
    },
    {
      // Contains jpeg in string.
      code: `
        export const IMAGE = "http://google.com/image.jpeg";
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Literal' }],
    },
  ],
});
