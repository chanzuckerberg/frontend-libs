import { RuleTester } from 'eslint';
import rule from './no-jest-in-stories';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
});

ruleTester.run('no-jest-in-storybook', rule, {
  valid: [
    {
      // No click handlers specified.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
        export const Standard = () => <button>hi</button>;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Click handler specified not using Jest.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
        export const Standard = () => <button>hi</button>;
        Standard.args = {
          onClick: () => {},
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Click handler specified with Jest, but in a non-story file.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
        export const Standard = () => <button>hi</button>;
        Standard.args = {
          onClick: jest.fn(),
        };
      `,
      filename: 'src/components/Button/nope.tsx',
    },
  ],
  invalid: [
    {
      // Clicked handler specified with Jest.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
        export const Standard = () => <button>hi</button>;
        Standard.args = {
          onClick: jest.fn(),
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Identifier' }],
    },
    {
      // Clicked handler specified with Jest.
      code: `
        export default {
          title: "UI/Button",
          component: Button,
        };
        const defaultArgs = {
          onClick: jest.fn(),
        };
        const Standard = () => <button>hi</button>;
        Standard.args = defaultArgs;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Identifier' }],
    },
  ],
});
