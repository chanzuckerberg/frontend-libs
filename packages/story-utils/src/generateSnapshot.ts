import { render, RenderResult } from '@testing-library/react';
import { getStoriesFromStoryFileExports } from './getStories';
import type { StoryData, StoryFileExports } from './getStories';
import prepareStory from './prepareStory';

type TestOptions<Args> = {
  /**
   * get the snapshot either synchronously, returning the ChildNode,
   * or asynchronously returning a promise that resolves to the ChildNode.
   */
  getSnapshot?: (
    wrapper: RenderResult,
  ) => Promise<ChildNode | null> | ChildNode | null;
  /**
   * Override the args for the story. Useful for event handlers that may be missing.
   */
  argOverrides?: Partial<Args>;
};

function getDefaultSnapshot(wrapper: RenderResult) {
  return wrapper.container.firstChild;
}

/**
 * Runs snapshot tests on all stories imported with `import * as anthology from 'storypath.stories.tsx'`
 * @param exportedStories the exports of a .stories.tsx file including the default export with additional context
 * @param options the options for the test to add necessary context specific to snapshot tests
 */
export default function generateSnapshot<
  S extends StoryFileExports<Args>,
  Args
>(
  storiesFileExports: S,
  { getSnapshot = getDefaultSnapshot, argOverrides }: TestOptions<Args> = {},
): void {
  const stories = getStoriesFromStoryFileExports(storiesFileExports);

  for (const [storyName, story] of Object.entries<StoryData>(stories)) {
    if (story.parameters?.snapshot?.disabled) continue;

    test(`${storyName} story renders snapshot`, async () => {
      const wrapper = render(prepareStory(story.storyFn, argOverrides));
      expect(await getSnapshot(wrapper)).toMatchSnapshot();
    });
  }
}
