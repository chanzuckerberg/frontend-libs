import noCSFv2 from './rules/no-csf-v2';
import noExtResourcesInStories from './rules/no-ext-resources-in-stories';

const rules = {
  'no-csf-v2': noCSFv2,
  'no-ext-resources-in-stories': noExtResourcesInStories,
};

const recommendedRules = {
  '@chanzuckerberg/stories/no-ext-resources-in-stories': 'error',
};

const strictRules = {
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
