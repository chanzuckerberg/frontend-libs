import type {Rule} from 'eslint';
import isStories from '../utils/isStories';

const failureMessage =
  'Story must be an object literal (component story format v3) or a function (v2). See https://storybook.js.org/blog/component-story-format-3-0/';

/**
 * Enforce syntax for story objects to have to be an object literal
 *
 * For example, instead of
 *
 *   const Primary = {
 *     <Component ... />
 *   }
 *
 * we would want to do something have a story object that specifies how a story renders
 * through an explicit render function
 *
 *   const Primary = {
 *     render: (args) => { ... },
 *   }
 *
 * or uses the default render function if want to just spread the args into your component
 *
 *   const Primary = {}
 *
 */
const rule: Rule.RuleModule = {
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      // Assume that any named export of a story file is, in fact, a story.
      ExportNamedDeclaration(node) {
        const declaration = node.declaration;
        if (!declaration || declaration.type !== 'VariableDeclaration') {
          return;
        }

        const expression = declaration.declarations[0]?.init;
        if (!expression) {
          return;
        }

        // function expressions used for CSF v2
        const isFunction =
          expression.type === 'FunctionExpression' ||
          expression.type === 'ArrowFunctionExpression';

        // CSF v3 allows story object
        const isObjectLiteral = expression.type === 'ObjectExpression';

        // allow for Template.bind(null)
        const isCallExpression = expression.type === 'CallExpression';

        if (!isFunction && !isObjectLiteral && !isCallExpression) {
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
