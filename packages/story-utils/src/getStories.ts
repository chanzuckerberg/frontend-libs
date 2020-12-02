import path from 'path';
import type { Parameters, Story } from '@storybook/react/types-6-0';
import glob from 'glob';
import merge from 'lodash/merge';

type StoryData = {
  componentTitle: string;
  name: string;
  parameters: Parameters;
  storyFn: Story<unknown>;
};

export default function getStories(globPath = '**/*.stories.*'): StoryData[] {
  const filePaths = glob.sync(globPath);

  return filePaths.flatMap((filePath) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const storiesFileExports = require(path.resolve(filePath));
    const { default: metadata, ...storiesMap } = storiesFileExports;

    return Object.keys(storiesMap).map((storyName: string) => {
      const story = storiesMap[storyName] as Story<unknown>;
      const parameters = merge({}, metadata.parameters, story.parameters);

      return {
        componentTitle: metadata.title,
        name: storyName,
        parameters,
        storyFn: story,
      };
    });
  });
}