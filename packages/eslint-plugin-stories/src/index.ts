import noJestInStories from './rules/no-jest-in-stories';
import noTopLevelStoryArgs from './rules/no-top-level-story-args';
import storiesDefaultExport from './rules/stories-default-export';

const rules = {
  'no-jest-in-stories': noJestInStories,
  'no-top-level-story-args': noTopLevelStoryArgs,
  'stories-default-export': storiesDefaultExport,
};

const recommendedRules = {
  'no-jest-in-stories': 'error',
  'no-top-level-story-args': 'error',
  'stories-default-export': 'error',
};

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: recommendedRules,
    },
  },
};
