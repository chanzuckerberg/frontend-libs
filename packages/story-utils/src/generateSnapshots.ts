import type { Meta, Story, StoryContext } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';
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

type StoriesImport = {
  default: Meta;
};

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

  for (const [storyName, Story] of Object.entries<Story>(stories)) {
    if (Story.parameters?.snapshot?.skip) continue;

    test(`${storyName} story renders snapshot`, async () => {
      const view = render(createElement(Story));

      // @storybook/testing-react doesn't run play functions automatically (as of v1.0.0-next.0).
      // So if one is present, run it before taking a snapshot.
      if (Story.play) {
        // @storybook/testing-react's docs (as of v1.0.0-next.0) don't indicate that we need to
        // pass anything to `Story.play`. But its type does require a story context to be passed
        // in. Assume for now that we don't need to pass anything in, but trick TypeScript into
        // thinking we are. Hopefully the types get updated in the future.
        const storyContext = undefined as StoryContext<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

        await Story.play(storyContext);
      }

      // When components that include Apollo's useQuery are rendered we need
      // to await an act that pushes the test to the end of the event loop.
      // https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
      await wait();

      expect(await getElement(view)).toMatchSnapshot();
    });
  }
}
