import type {Rule} from 'eslint';

const getFailureMessage = (name: string) => {
  return `Please use the <Heading> component from the @chanzuckerberg/eds repo instead of an <${name}> tag 💕`;
};
const hTags = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
};

const rule: Rule.RuleModule = {
  create(context) {
    return {
      JSXElement(node: any) {
        const name = node.openingElement.name.name;

        if (name in hTags) {
          context.report({
            node: node.openingElement,
            message: getFailureMessage(name),
          });
        }
      },
    };
  },
};
export default rule;
