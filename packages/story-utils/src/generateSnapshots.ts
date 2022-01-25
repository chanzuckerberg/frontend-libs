import type { Meta } from '@storybook/react';
import { composeStories, composeStory } from '@storybook/testing-react';
import { render, RenderResult } from '@testing-library/react';
import { createElement } from 'react';
import wait from './wait';

type TestOptions = {
  /**
   * Get the element to snapshot, either synchronously or asynchronously.
   */
  getElement?: (
    wrapper: RenderResult,
  ) => Promise<ChildNode | null> | ChildNode | null;
};

/**
 * Type for the star import of a stories file. For example:
 *
 *   import * as stories from './foo.stories.tsx';
 *
 * Technically there will also be stories themselves on the import, but there doesn't seem to be a
 * good way to type those.
 */
type StoriesImport = {
  default: Meta;
};

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
  storiesImport: StoriesImport,
  { getElement = (wrapper) => wrapper.container.firstChild }: TestOptions = {},
): void {
  const stories = composeStories(storiesImport);

  for (const [storyName, Story] of Object.entries<ComposedStory>(stories)) {
    if (Story.parameters?.snapshot?.skip) continue;

    test(`${storyName} story renders snapshot`, async () => {
      const view = render(createElement(Story));

      // When components that include Apollo's useQuery are rendered we need
      // to await an act that pushes the test to the end of the event loop.
      // https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
      await wait();

      // @storybook/testing-react doesn't run play functions automatically (as of v1.0.0). So if
      // one is present, run it before taking a snapshot.
      if (Story.play) {
        const storyContext = {
          loaded: {},
          abortSignal: new AbortController().signal,
          canvasElement: document.createElement('div'),
        };

        await Story.play(storyContext);
      }

      expect(await getElement(view)).toMatchSnapshot();
    });
  }
}
