import type {Rule} from 'eslint';

const failureMessage =
  'Please use the <Text> component from the @chanzuckerberg/eds repo instead of a <p> tag 🥰';

const rule: Rule.RuleModule = {
  create(context) {
    return {
      JSXElement(node: any) {
        if (node.openingElement.name.name === 'p') {
          context.report({
            node: node.openingElement,
            message: failureMessage,
          });
        }
      },
    };
  },
};

export default rule;
