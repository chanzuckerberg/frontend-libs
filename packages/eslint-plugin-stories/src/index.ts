import noJestInStories from './rules/no-jest-in-stories';
import noTopLevelStoryArgs from './rules/no-top-level-story-args';
import storiesDefaultExport from './rules/stories-default-export';

const rules = {
  'no-jest-in-stories': noJestInStories,
  'no-top-level-story-args': noTopLevelStoryArgs,
  'stories-default-export': storiesDefaultExport,
};

const recommendedRules = {
  '@chanzuckerberg/stories/no-jest-in-stories': 'error',
  '@chanzuckerberg/stories/no-top-level-story-args': 'error',
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
