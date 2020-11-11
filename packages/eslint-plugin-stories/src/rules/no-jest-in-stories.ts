import type { Rule } from 'eslint';
import { dedent } from 'ts-dedent';
import isStories from '../utils/isStories';

const failureMessage = dedent`
  Don't use jest functions in stories. These will work in tests, but not in other contexts that
  stories can be used

  For most event handlers (onClick, onFocus, etc), you don't actually have to specify the prop.
  Storybook will detect those and inject its own handlers (see https://storybook.js.org/docs/react/essentials/actions).

  If you must provide a handler, pass an empty function

  export const Standard = (args) => <button {...args} />;
  Standard.args = {
    onFoobar: () => {},
  };

  Tests can then override this as necessary.
`;

const rule: Rule.RuleModule = {
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    return {
      Identifier(node) {
        if (node.name === 'jest') {
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
