import {
  AST_NODE_TYPES,
  ESLintUtils,
} from '@typescript-eslint/experimental-utils';
import rule from '../csf-v3-types';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('csf-v3-types', rule, {
  valid: [
    {
      // Empty object story with type.
      code: `
        export const Primary: StoryObj<Args> = {};
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story with render arrow function, args, and type.
      code: `
        export const Primary: StoryObj<Args> = {
          render: (args) => <Button {...args} />,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story with render method, args, and type.
      code: `
        export const Primary: StoryObj<Args> = {
          render(args) { return <Button {...args} />; },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story with render function expression, args, and type.
      code: `
        export const Primary: StoryObj<Args> = {
          render: function (args) { return <Button {...args} />; },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story without render args without type.
      code: `
        export const Primary = {
          render: () => <Button type="primary" />,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story extending another one with a render function, args, and type.
      code: `
        export const Secondary: StoryObj<Args> = {
          ...Primary,
          render: (args) => <Button {...args} />,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story with no render function, with other properties and type.
      code: `
        export const Secondary: StoryObj<Args> = {
          args: {
            type: 'secondary',
          },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Object story extending another one with no render function.
      // Bail out early and don't analyze these. Possible false negative, but it's not worth trying
      // to figure out whether the properties brought in by the spread object would require us to
      // type this thing or not.
      code: `
        export const Secondary = {
          ...Primary,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Function story without type.
      code: `
        export const Primary = (args) => <Button {...args} />;
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Cloned function story
      code: `
        export const Secondary = Primary.bind(null);
      `,
      filename: 'src/components/Button/Button.stories.tsx',
    },
    {
      // Anything in a non-story file.
      code: `
        export const Primary = {};
      `,
      filename: 'src/components/Button/Button.tsx',
    },
  ],
  invalid: [
    {
      // Empty object story without type.
      code: `
        export const Primary = {};
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [
        {
          type: AST_NODE_TYPES.ExportNamedDeclaration,
          messageId: 'specifyType',
        },
      ],
    },
    {
      // Object story with render arrow function, args, and no type.
      code: `
        export const Primary = {
          render: (args) => <Button {...args} />,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [
        {
          type: AST_NODE_TYPES.ExportNamedDeclaration,
          messageId: 'specifyType',
        },
      ],
    },
    {
      // Object story with render method, args, and no type.
      code: `
        export const Primary = {
          render(args) { return <Button {...args} />; },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [
        {
          type: AST_NODE_TYPES.ExportNamedDeclaration,
          messageId: 'specifyType',
        },
      ],
    },
    {
      // Object story with render function expression, args, and no type.
      code: `
        export const Primary = {
          render: function (args) { return <Button {...args} />; },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [
        {
          type: AST_NODE_TYPES.ExportNamedDeclaration,
          messageId: 'specifyType',
        },
      ],
    },
    {
      // Object story extending another one with a render function, args, and no type.
      code: `
        export const Secondary = {
          ...Primary,
          render: (args) => <Button {...args} />,
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [
        {
          type: AST_NODE_TYPES.ExportNamedDeclaration,
          messageId: 'specifyType',
        },
      ],
    },
    {
      // Object story with no render function or type, with other properties.
      code: `
        export const Secondary = {
          args: {
            type: 'secondary',
          },
        };
      `,
      filename: 'src/components/Button/Button.stories.tsx',
      errors: [
        {
          type: AST_NODE_TYPES.ExportNamedDeclaration,
          messageId: 'specifyType',
        },
      ],
    },
  ],
});
