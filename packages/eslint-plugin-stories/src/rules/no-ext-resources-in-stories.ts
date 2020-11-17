import type { Rule } from 'eslint';
import { dedent } from 'ts-dedent';
import isStories from '../utils/isStories';

const failureMessage = dedent`
  Don't use external resources in stories. These will take time to load and may cause flakiness with Percy

  For images, use images that are committed to the repo and import directly into the story. Webpack will then convert that 
  into a data url, and no network request will be made.

  
`;

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
          node.value.includes('http') &&
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
