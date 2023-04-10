import {
  composeStories,
  type composeStory,
  type ReactRenderer,
} from '@storybook/react';
import type {Store_CSFExports} from '@storybook/types';
import {render, type RenderResult} from '@testing-library/react';
import {createElement} from 'react';
import wait from './wait';

type TestOptions = {
  /**
   * Get the element to snapshot, either synchronously or asynchronously.
   */
  getElement?: (
    wrapper: RenderResult,
  ) => Promise<ChildNode | null> | ChildNode | null;
};

type StoryFile = Store_CSFExports<ReactRenderer>;

/**
 * composeStories uses composeStory. There's no explicit type exported that we can use while
 * iterating stories (as of v1.0.0), so instead directly use the return type of the function.
 */
type ComposedStory = ReturnType<typeof composeStory>;

/**
 * Generate snapshot tests for all stories imported from a file.
 *
 * @example
 *
 * import {generateSnapshots} from '@chanzuckerberg/story-utils';
 * import * as stories from './SomeComponent.stories.jsx';
 *
 * generateSnapshots(stories);
 */
export default function generateSnapshots(
  storiesImport: StoryFile,
  {getElement = (wrapper) => wrapper.container.firstChild}: TestOptions = {},
): void {
  const stories = composeStories(storiesImport);

  for (const [storyName, Story] of Object.entries<ComposedStory>(stories)) {
    if (Story.parameters?.snapshot?.skip) continue;

    test(`${storyName} story renders snapshot`, async () => {
      const view = render(createElement(Story));

      // @storybook/testing-react doesn't run play functions automatically (as of v1.0.0). So if
      // one is present, run it before taking a snapshot.
      if (Story.play) {
        // Ensure the story has fully rendered before running the play function.
        await wait();

        const storyContext = {
          loaded: {},
          abortSignal: new AbortController().signal,
          canvasElement: view.container,
        };

        await Story.play(storyContext);
      }

      // Ensure the story has fully rendered before taking a snapshot. Normally this won't be
      // necessary, but can be useful for cases where there is async stuff happening, For example,
      // if waiting on mock network requests to respond.
      //
      // Inspired by https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/.
      await wait();

      expect(await getElement(view)).toMatchSnapshot();
    });
  }
}
