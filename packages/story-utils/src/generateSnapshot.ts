import prepareStory from "./prepareStory";
import { render, RenderResult } from "@testing-library/react";
import getStories from "./getStories"
import type { StoryData } from "./getStories"

type TestOptions<Args> = {
  /**
   * get the snapshot either synchronously, returning the ChildNode,
   * or asynchronously returning a promise that resolves to the ChildNode.
   */
  getSnapshot?: (
    wrapper: RenderResult,
  ) => Promise<unknown> | unknown;
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
 * @param anthology the exports of a .stories.tsx file including the default export with additional context
 * @param options the options for the test to add necessary context specific to snapshot tests
 */
export default function generateSnapshot<Args>(globPattern: string, {
    getSnapshot = getDefaultSnapshot,
    argOverrides,
}: TestOptions<Args> = {},
  ) {
  const stories = getStories(globPattern);

  for (const [storyName, story] of Object.entries<StoryData>(stories)) {
    if (story.parameters?.snapshot?.disabled) continue;

    test(`${storyName} story renders snapshot jksladjsfkl`, async () => {
      const wrapper = render(prepareStory(story.storyFn, argOverrides));
      expect(await getSnapshot(wrapper)).toMatchSnapshot();
    });
  }
}
