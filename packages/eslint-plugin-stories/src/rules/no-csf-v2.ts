import type {Rule} from 'eslint';
import isStories from '../utils/isStories';

const failureMessage =
  "Don't write stories as functions. Instead, use objects (component story format v3). See https://storybook.js.org/blog/component-story-format-3-0/";

const rule: Rule.RuleModule = {
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      // Assume that any named export export of a story file is, in fact, a story.
      ExportNamedDeclaration(node) {
        if (!node.declaration) {
          return;
        }

        const isFunctionDeclaration =
          node.declaration.type === 'FunctionDeclaration';
        const isFunctionExpression =
          node.declaration.type === 'VariableDeclaration' &&
          node.declaration.declarations[0]?.init?.type === 'FunctionExpression';
        const isArrowFunctionExpression =
          node.declaration.type === 'VariableDeclaration' &&
          node.declaration.declarations[0]?.init?.type ===
            'ArrowFunctionExpression';

        if (
          isFunctionDeclaration ||
          isFunctionExpression ||
          isArrowFunctionExpression
        ) {
          context.report({
            node,
            message: failureMessage,
          });
        }
      },
    };
  },
};

export default rule;
