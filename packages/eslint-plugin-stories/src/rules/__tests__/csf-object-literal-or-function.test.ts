import { RuleTester } from 'eslint';
import rule from '../csf-object-literal-or-function';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

ruleTester.run('no-csf-v2', rule, {
  valid: [
    {
      // CSF 2.0 - story function
      code: `
        export const Default = (args) => <Button {...args} />;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // CSF 3.0 - explicit render function
      code: `
        export const Default = {
          render: (args) => <Button {...args} />,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // CSF 3.0 - default render function
      code: `
        export const Default = {};
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // allow for Template.bind
      code: `
        export const Default = Template.bind(null);
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
  ],
  invalid: [
    {
      // story object with no render function
      code: `
        export const Default = <Component />;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [{ type: 'ExportNamedDeclaration' }],
    },
  ],
});
