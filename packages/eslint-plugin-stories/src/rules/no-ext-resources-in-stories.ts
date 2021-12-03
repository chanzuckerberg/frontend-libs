import type { Rule } from 'eslint';
import isStories from '../utils/isStories';

const failureMessage =
  "Don't use external resources (such as images) in stories, which can cause flakiness in visual regression testing. See https://czi.atlassian.net/wiki/x/0KN1H";

const rule: Rule.RuleModule = {
  create(context) {
    if (!isStories(context.getFilename())) {
      return {};
    }

    const IMAGE_FILE_TYPES_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

    return {
      Literal(node) {
        // logic here is to look for strings that end with an image file type
        if (
          typeof node.value === 'string' &&
          node.value.startsWith('http') &&
          IMAGE_FILE_TYPES_REGEX.test(node.value)
        ) {
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
