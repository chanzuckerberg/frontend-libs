import type {TSESLint} from '@typescript-eslint/experimental-utils';

const failureMessages = {
  uselessKey:
    "Keys only need to be provided for lists generated by an iterator (like `Array.map`), and this one doesn't seem necessary. See https://reactjs.org/docs/lists-and-keys.html for more information.",
};

const rule: TSESLint.RuleModule<keyof typeof failureMessages> = {
  defaultOptions: [],
  meta: {
    fixable: 'code',
    messages: failureMessages,
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'key') {
          return;
        }

        const openingJsxElement = node.parent;
        const entireJsxElement = openingJsxElement?.parent;
        const parent = entireJsxElement?.parent;

        // If the parent is another JSX element, as opposed to a return statement or an array or
        // something, we definitely don't need the `key` attribute.
        if (parent?.type === 'JSXElement') {
          context.report({
            node,
            messageId: 'uselessKey',
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
};

export default rule;
