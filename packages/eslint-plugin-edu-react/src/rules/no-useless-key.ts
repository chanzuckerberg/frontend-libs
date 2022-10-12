import type {TSESLint} from '@typescript-eslint/experimental-utils';

const failureMessages = {
  uselessKey:
    "Keys only need to be provided for lists of items, and this one doesn't seem necessary. See https://reactjs.org/docs/lists-and-keys.html for more.",
};

const rule: TSESLint.RuleModule<keyof typeof failureMessages> = {
  defaultOptions: [],
  meta: {
    messages: failureMessages,
    type: 'suggestion',
    schema: [],
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
          context.report({node, messageId: 'uselessKey'});
        }
      },
    };
  },
};

export default rule;
