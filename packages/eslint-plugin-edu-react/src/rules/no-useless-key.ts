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

        // If the JSXElement is the direct child of another, it unambiguously does NOT need a key.
        //
        //   <div>
        //     <div key="wat" /> // <- No key needed
        //   </div>
        //
        // This only detects the above pattern because it's clear. There are other patterns where
        // a key _probably_ aren't necessary, but we bail out of those.
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
