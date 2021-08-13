import { render, RenderResult } from '@testing-library/react';
import { getStoriesFromStoryFileExports } from './getStories';
import type { StoryData, StoryFileExports } from './getStories';
import prepareStory from './prepareStory';
import wait from './wait';

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
 * Runs snapshot tests on all stories imported with `import * as snapshotTestStoryFile from 'storypath.stories.tsx'`
 * @param storyFileExports the exports of a .stories.tsx file including the default export with additional context
 * @param options the options for the test to add necessary context specific to snapshot tests
 */
export default function generateSnapshots<
  S extends StoryFileExports<Args>,
  Args,
>(
  storyFileExports: S,
  { getSnapshot = getDefaultSnapshot, argOverrides }: TestOptions<Args> = {},
): void {
  const stories = getStoriesFromStoryFileExports(storyFileExports);

  for (const [storyName, story] of Object.entries<StoryData>(stories)) {
    if (story.parameters?.snapshot?.skip) continue;

    test(`${storyName} story renders snapshot`, async () => {
      const view = render(prepareStory(story.storyFn, argOverrides));

      // When components that include Apollo's useQuery are rendered we need
      // to await an act that pushes the test to the end of the event loop.
      // https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
      await wait();

      expect(await getSnapshot(view)).toMatchSnapshot();
    });
  }
}
