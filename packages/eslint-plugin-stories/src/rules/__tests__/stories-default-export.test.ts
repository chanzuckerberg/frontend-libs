import { RuleTester } from 'eslint';
import rule from '../stories-default-export';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('stories-default-export', rule, {
  valid: [
    {
      // Both title and component are present.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Only component is present.
      code: `
        export default {
          component: Button,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Missing a component, but in a non-stories file.
      code: `
        export default {
          title: "UI/Button",
        };
      `,
      filename: 'src/components/Button/foo.tsx',
    },
    {
      // Non-required properties are present.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
          parameters: {
            renderSpec: {
              skip: true,
            },
          },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Missing default export, but not a stories file.
      code: `
        export const Standard = () => 'hi';
      `,
      filename: 'src/components/Button/not-here.tsx',
    },
  ],
  invalid: [
    {
      // Missing component.
      code: `
        export default {
          title: "UI/Button",
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'ExportDefaultDeclaration' }],
    },
    {
      // Missing default export.
      code: `
        export const Standard = () => 'hi';
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Program' }],
    },
  ],
});
