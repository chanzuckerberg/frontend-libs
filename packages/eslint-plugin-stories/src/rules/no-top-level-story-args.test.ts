import { RuleTester } from 'eslint';
import rule from '../../src/rules/no-top-level-story-args';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-top-level-story-args', rule, {
  valid: [
    {
      // No args in the default export
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Args in a non-default export.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
        const stuff = {
          args: {
            analyticsName: "foobear",
          },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Args in the default export, but in a non-stories file.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
          args: {
            analyticsName: "foobear",
          },
        };
      `,
      filename: 'src/components/Button/Stuff.ts',
    },
  ],
  invalid: [
    {
      // Args in the default export.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
          args: {
            analyticsName: "foobear",
          },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Property' }],
    },
  ],
});
