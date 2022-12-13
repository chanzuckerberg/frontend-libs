import {RuleTester} from 'eslint';
import rule from '../no-components-without-story';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-components-without-story', rule, {
  valid: [
    {
      name: 'a story file',
      code: 'export default {}',
      filename: 'foo.stories.tsx',
    },
    {
      name: 'a ts file',
      code: 'export default {}',
      filename: 'foo.ts',
    },
    {
      name: 'a spec file',
      code: 'export default {}',
      filename: 'foo.spec.tsx',
    },
    {
      name: 'a tsx file without exports',
      code: 'foo',
      filename: 'foo.tsx',
    },
    {
      name: 'a tsx file with exports with tsx story file',
      code: 'export default {}',
      filename:
        'packages/eslint-plugin-stories/src/rules/__tests__/noComponentsWithoutStoryTestComponentTSX.tsx',
    },
    {
      name: 'a tsx file with exports with ts story file',
      code: 'export default {}',
      filename:
        'packages/eslint-plugin-stories/src/rules/__tests__/noComponentsWithoutStoryTestComponentTS.tsx',
    },
  ],
  invalid: [
    {
      name: 'a lone component file',
      code: 'export default {}',
      filename: 'foo.tsx',
      errors: [{type: 'ExportDefaultDeclaration'}],
    },
  ],
});
