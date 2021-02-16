import { RuleTester } from 'eslint';
import rule from '../no-story-decorators';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
});

ruleTester.run('no-story-decorators', rule, {
  valid: [
    {
      // Story with no decorators.
      code: `
        export default {
          title: 'UI/Button',
          component: Button,
        };

        export const Primary = () => <Button primary>hello</Button>;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Non-story with component decorators.
      code: `
        export default {
          title: 'UI/Button',
          component: Button,
          decorators: [
            (Story) => <div className="app"><Story /></div>,
          ],
        };

        export const Primary = () => <Button primary>hello</Button>;
      `,
      // Isn't a story because the filename doesn't include '.stories'.
      filename: 'src/components/Button/Button.tsx',
    },
    {
      // Non-story with story decorators.
      code: `
        export default {
          title: 'UI/Button',
          component: Button,
        };

        export const Primary = () => <Button primary>hello</Button>;
        Primary.decorators = [
          (Story) => <div className="app"><Story /></div>,
        ];
      `,
      // Isn't a story because the filename doesn't include '.stories'.
      filename: 'src/components/Button/Button.tsx',
    },
  ],
  invalid: [
    {
      // Story with component decorators.
      code: `
        export default {
          title: 'UI/Button',
          component: Button,
          decorators: [
            (Story) => <div className="app"><Story /></div>,
          ],
        };

        export const Primary = () => <Button primary>hello</Button>;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'Property' }],
    },
    {
      // Story with story decorators.
      code: `
        export default {
          title: 'UI/Button',
          component: Button,
        };

        export const Primary = () => <Button primary>hello</Button>;
        Primary.decorators = [
          (Story) => <div className="app"><Story /></div>,
        ];
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'MemberExpression' }],
    },
  ],
});
