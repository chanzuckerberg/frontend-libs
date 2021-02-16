import type { Rule } from 'eslint';
import { dedent } from 'ts-dedent';
import isStories from '../utils/isStories';

const componentDecoratorsSelector = 'Property[key.name="decorators"]';
const storyDecoratorsSelector = 'MemberExpression[property.name="decorators"]';

const failureMessage = dedent`
  When writing Storybook stories, don't use \`decorators\` to wrap stories in additional functionality
  or context. Instead, add any wrapping components or functionality directly into the stories themselves.

  export const PrimaryButton = () => (
    <CurrentUserContext name="jane">
      <div class="margin-top">
        <PrimaryButton>hello</PrimaryButton>
      </div>
    </CurrentUserContext>
  );

  Doing so allows us to more easily re-use the stories outside of Storybook.
`;

const rule: Rule.RuleModule = {
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      [componentDecoratorsSelector](node: Rule.Node) {
        context.report({
          node,
          message: failureMessage,
        });
      },
      [storyDecoratorsSelector](node: Rule.Node) {
        context.report({
          node,
          message: failureMessage,
        });
      },
    };
  },
};

export default rule;
