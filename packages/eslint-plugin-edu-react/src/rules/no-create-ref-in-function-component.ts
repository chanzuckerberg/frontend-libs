import type {Rule} from 'eslint';

const failureMessage =
  'createRef should generally not be used in function components. Did you mean to use the "useRef" hook, instead?';

const rule: Rule.RuleModule = {
  create(context) {
    let hasClassDeclaration = false;
    let suspiciousNode: Rule.Node | null = null;

    return {
      ClassDeclaration() {
        hasClassDeclaration = true;
      },

      CallExpression(node) {
        if (
          // createRef(...);
          (node.callee.type === 'Identifier' &&
            node.callee.name === 'createRef') ||
          // React.createRef(...);
          (node.callee.type === 'MemberExpression' &&
            node.callee.object.type === 'Identifier' &&
            node.callee.object.name === 'React' &&
            node.callee.property.type === 'Identifier' &&
            node.callee.property.name === 'createRef')
        ) {
          suspiciousNode = node;
        }
      },

      'Program:exit'() {
        // If there is a `createRef` node but no class declarations, report a violation.
        //
        // In other words, assume that the `createRef` is legit if there are any classes present.
        // Presumably these classes are class components.
        //
        // This strategy may have a lot of false negatives, but shouldn't have any false positives.
        // That's okay. The intent is to catch easy violations, not every possible one.
        if (suspiciousNode && !hasClassDeclaration) {
          context.report({
            node: suspiciousNode,
            message: failureMessage,
          });
        }
      },
    };
  },
};

export default rule;
