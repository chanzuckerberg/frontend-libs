import type { Meta, Story } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';
import { render, RenderResult } from '@testing-library/react';
import { createElement } from 'react';
import wait from './wait';

type TestOptions = {
  /**
   * get the snapshot either synchronously, returning the ChildNode,
   * or asynchronously returning a promise that resolves to the ChildNode.
   */
  getSnapshot?: (
    wrapper: RenderResult,
  ) => Promise<ChildNode | null> | ChildNode | null;
};

type StoriesImport = {
  default: Meta;
};

function getDefaultSnapshot(wrapper: RenderResult) {
  return wrapper.container.firstChild;
}

/**
 * Runs snapshot tests on all stories imported with `import * as snapshotTestStoryFile from 'storypath.stories.tsx'`
 * @param storyFileExports the exports of a .stories.tsx file including the default export with additional context
 * @param options the options for the test to add necessary context specific to snapshot tests
 */
export default function generateSnapshots(
  storiesImport: StoriesImport,
  { getSnapshot = getDefaultSnapshot }: TestOptions = {},
): void {
  const stories = composeStories(storiesImport);

  for (const [storyName, Story] of Object.entries<Story>(stories)) {
    if (Story.parameters?.snapshot?.skip) continue;

    test(`${storyName} story renders snapshot`, async () => {
      const view = render(createElement(Story));

      // When components that include Apollo's useQuery are rendered we need
      // to await an act that pushes the test to the end of the event loop.
      // https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
      await wait();

      expect(await getSnapshot(view)).toMatchSnapshot();
    });
  }
}
