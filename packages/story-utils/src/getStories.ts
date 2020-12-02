import path from 'path';
import type { Parameters, Story } from '@storybook/react/types-6-0';
import glob from 'glob';
import merge from 'lodash/merge';
import * as zod from 'zod';

type StoryData = {
  componentTitle: string;
  name: string;
  parameters: Parameters;
  storyFn: Story<unknown>;
};

const metadataSchema = zod
  .object({
    title: zod.string(),
    parameters: zod.record(zod.unknown()).optional(),
  })
  .nonstrict();

/**
 * Get information about stories in files matching a glob pattern. Useful for consuming stories in
 * a Node environment.
 */
export default function getStories(globPattern: string): StoryData[] {
  const filePaths = glob.sync(globPattern);

  return filePaths.flatMap((filePath) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const storiesFileExports = require(path.resolve(filePath));
    const { default: rawMetadata, ...storiesMap } = storiesFileExports;
    const metadata = metadataSchema.parse(rawMetadata);

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
