# story-utils

Utilities for using [Storybook stories](https://storybook.js.org/docs/react/get-started/whats-a-story) in non-Storybook environments. For example, using stories in Jest tests.

## Requirements

- Storybook 7 (if you're using Storybook 6, use story-utils@v3)

## Installation

Install @chanzuckerberg/story-utils with your favorite package manager. With yarn, that would look like

```sh
yarn add --dev @chanzuckerberg/story-utils
```

## Utilities

- [generateSnapshots](#generatesnapshots)

### generateSnapshots

Auto generates snapshots for stories

```js

import * as snapshotTestStoryFile from "./MyButton.stories";
import { generateSnapshots } from "@chanzuckerberg/story-utils";

describe("My button", () => {
  generateSnapshots(snapshotTestStoryFile);
});
```

If you want to skip generating snapshots for a story:

```js
SomeStory.parameters = {
  snapshot: {
    skip: true,
  },
};
```
