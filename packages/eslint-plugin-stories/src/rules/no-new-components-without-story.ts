const fs = require('fs');
import type { Rule } from 'eslint';

const failureMessage = `
  React Components must have a corresponding Storybook story.

  "Storybook" is our component explorer, and a "story" is a component example that serves as a unit for Storybook

  Having a Storybook story for each component allows us to test our components' behavior, accessibility,
  visual regression, etc. Learn more here:
  https://go.czi.team/storybook-testing
`;

/**
 * To encourage Storybook coverage, we warn developers about React components without stories.
 */
const rule: Rule.RuleModule = {
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        const filename = context.getFilename();
        const isComponent =
          filename.match('.tsx') &&
          !filename.match('.stories.') &&
          !filename.match('.spec.');

        if (!isComponent) {
          return;
        }

        const storyFilename = `${filename.split('.')[0]}.stories.tsx`;
        const correspondingStoryExists = fs.existsSync(storyFilename);

        if (!correspondingStoryExists) {
          context.report({
            node: node,
            message: failureMessage,
          });
        }
      },
    };
  },
};

export default rule;
