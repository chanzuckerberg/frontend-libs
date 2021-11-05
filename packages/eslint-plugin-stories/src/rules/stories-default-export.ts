import type { Rule } from 'eslint';
import isStories from '../utils/isStories';

const rule: Rule.RuleModule = {
  create(context) {
    let hasDefaultExport = false;

    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      ExportDefaultDeclaration(node) {
        hasDefaultExport = true;

        if (node.declaration.type !== 'ObjectExpression') {
          return;
        }

        const propertyNames = node.declaration.properties.map((property) => {
          if (property.type === 'Property') {
            const key = property.key;

            if (key.type === 'Identifier') {
              return key.name;
            }
          }
        });

        if (!propertyNames.includes('component')) {
          context.report({
            node,
            message:
              'Storybook stories default export must include `component`',
          });
        }
      },
      'Program:exit'(node: Rule.Node) {
        if (!hasDefaultExport) {
          context.report({
            node,
            message:
              'Storybook stories files must have a default export of an object with at least a `component` key',
          });
        }
      },
    };
  },
};

export default rule;
