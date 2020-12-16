import path from 'path';
import { Args as DefaultArgs } from '@storybook/addons';
import type { Meta, Parameters, Story } from '@storybook/react/types-6-0';
import glob from 'glob';
import mapValues from 'lodash/mapValues';
import merge from 'lodash/merge';
import * as zod from 'zod';

export type StoryData<Args = DefaultArgs> = {
  componentTitle: string;
  name: string;
  parameters: Parameters;
  storyFn: Story<Args>;
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
 *
 * Validates the stories it finds, and will throw an error if they don't match component story
 * format. @see https://storybook.js.org/docs/react/api/csf
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

/**
 * The skeleton of an StoryFileExports. Should also contain stories where the default value matches Meta
 * but the remainder of exports matches Story.
 *
 * Should be extended as a generic type `<A extends StoryFileExports<Args>, Args>`.
 */
export type StoryFileExports<Args = DefaultArgs> = {
  default: Meta<Args>;
};

export function getStoriesFromStoryFileExports<
  S extends StoryFileExports,
  Args
>(
  storiesFileExports: S,
): Omit<{ [key in keyof S]: StoryData<Args> }, 'default'> {
  const { default: metadata, ...storiesMap } = storiesFileExports;

  const stories: unknown = mapValues(
    storiesMap,
    (story: Story<Args>, storyName: string) => {
      const parameters = merge({}, metadata.parameters, story.parameters);

      return {
        componentTitle: metadata.title,
        parameters,
        name: storyName,
        storyFn: story,
      };
    },
  );

  return stories as Omit<{ [key in keyof S]: StoryData<Args> }, 'default'>;
}
