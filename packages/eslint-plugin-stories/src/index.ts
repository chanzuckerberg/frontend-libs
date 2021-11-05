import noExtResourcesInStories from './rules/no-ext-resources-in-stories';
import noJestInStories from './rules/no-jest-in-stories';
import storiesDefaultExport from './rules/stories-default-export';

const rules = {
  'no-ext-resources-in-stories': noExtResourcesInStories,
  'no-jest-in-stories': noJestInStories,
  'stories-default-export': storiesDefaultExport,
};

const recommendedRules = {
  '@chanzuckerberg/stories/no-ext-resources-in-stories': 'error',
  '@chanzuckerberg/stories/no-jest-in-stories': 'error',
  '@chanzuckerberg/stories/stories-default-export': 'error',
};

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: recommendedRules,
    },
  },
};
