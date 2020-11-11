import type { Rule } from 'eslint';
import { dedent } from 'ts-dedent';
import isStories from '../utils/isStories';

const argsPropertySelector =
  'ExportDefaultDeclaration > ObjectExpression > Property[key.name="args"]';

const failureMessage = dedent`
  When writing Storybook stories, don't put \`args\` in the default export. To share args between
  stories, instead put the shared args in their own object and spread them into the individual story
  args.

  const defaultArgs = {
    analyticsName: "foobear",
  };

  PrimaryButton.args = {
    ...defaultArgs,
    type: "Primary",
  };

  Doing so allows us to more easily re-use the stories outside of Storybook.
`;

const rule: Rule.RuleModule = {
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      [argsPropertySelector](node: Rule.Node) {
        context.report({
          node,
          message: failureMessage,
        });
      },
    };
  },
};

export default rule;
