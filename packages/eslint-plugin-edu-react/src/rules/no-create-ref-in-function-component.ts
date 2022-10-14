import type {Rule} from 'eslint';

const failureMessage =
  'createRef should generally not be used in function components. Did you mean to use the "useRef" hook instead?';

const rule: Rule.RuleModule = {
  create(context) {
    const suspiciousNodes: Rule.Node[] = [];
    let hasClassDeclaration = false;

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
          suspiciousNodes.push(node);
        }
      },

      'Program:exit'() {
        // If there are `createRef` nodes but no class declarations, report violations.
        //
        // In other words, assume that the `createRef` is legit if there are any classes present.
        // Presumably these classes are class components.
        //
        // This strategy may have some false negatives, but shouldn't have many false positives.
        // That's okay. The intent is to catch easy violations, not every possible one.
        if (!hasClassDeclaration) {
          suspiciousNodes.forEach((node) =>
            context.report({node, message: failureMessage}),
          );
        }
      },
    };
  },
};

export default rule;
