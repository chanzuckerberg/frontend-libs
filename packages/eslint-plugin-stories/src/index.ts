import noExtResourcesInStories from './rules/no-ext-resources-in-stories';
import noJestInStories from './rules/no-jest-in-stories';
import noStoryDecorators from './rules/no-story-decorators';
import noTopLevelStoryArgs from './rules/no-top-level-story-args';
import storiesDefaultExport from './rules/stories-default-export';

const rules = {
  'no-ext-resources-in-stories': noExtResourcesInStories,
  'no-jest-in-stories': noJestInStories,
  'no-story-decorators': noStoryDecorators,
  'no-top-level-story-args': noTopLevelStoryArgs,
  'stories-default-export': storiesDefaultExport,
};

const recommendedRules = {
  '@chanzuckerberg/stories/no-ext-resources-in-stories': 'error',
  '@chanzuckerberg/stories/no-jest-in-stories': 'error',
  '@chanzuckerberg/stories/no-story-decorators': 'error',
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
