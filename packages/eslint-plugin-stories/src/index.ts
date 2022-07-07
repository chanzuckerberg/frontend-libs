import csfV3Types from './rules/csf-v3-types';
import noCSFv2 from './rules/no-csf-v2';
import noExtResourcesInStories from './rules/no-ext-resources-in-stories';

const rules = {
  'csf-v3-types': csfV3Types,
  'no-csf-v2': noCSFv2,
  'no-ext-resources-in-stories': noExtResourcesInStories,
};

const recommendedRules = {
  '@chanzuckerberg/stories/no-ext-resources-in-stories': 'error',
  '@chanzuckerberg/stories/csf-object-literal-or-function': 'error',
};

const strictRules = {
  '@chanzuckerberg/stories/csf-v3-types': 'error',
  '@chanzuckerberg/stories/no-csf-v2': 'error',
};

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: recommendedRules,
    },
    strict: {
      rules: {
        ...recommendedRules,
        ...strictRules,
      },
    },
  },
};
