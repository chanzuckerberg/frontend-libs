import noExtResourcesInStories from './rules/no-ext-resources-in-stories';

const rules = {
  'no-ext-resources-in-stories': noExtResourcesInStories,
};

const recommendedRules = {
  '@chanzuckerberg/stories/no-ext-resources-in-stories': 'error',
};

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: recommendedRules,
    },
  },
};
