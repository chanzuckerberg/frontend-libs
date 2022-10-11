import type {Rule} from 'eslint';

const failureMessage =
  'useEffect has no deps array, which will cause it to run after every render. Was this intentional? If yes, you can safely suppress this error.';

const rule: Rule.RuleModule = {
  create(context) {
    return {
      CallExpression(node) {
        const isUseEffect =
          // useEffect(...);
          (node.callee.type === 'Identifier' &&
            node.callee.name === 'useEffect') ||
          // React.useEffect(...);
          (node.callee.type === 'MemberExpression' &&
            node.callee.object.type === 'Identifier' &&
            node.callee.object.name === 'React' &&
            node.callee.property.type === 'Identifier' &&
            node.callee.property.name === 'useEffect');

        if (isUseEffect && node.arguments.length === 1) {
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
