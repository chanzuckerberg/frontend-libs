# story-utils

Utilities for using [Storybook stories](https://storybook.js.org/docs/react/get-started/whats-a-story) in non-Storybook environments. For example, using stories in Jest tests.

## Installation

Install @chanzuckerberg/story-utils with your favorite package manager. With yarn, that would look like

```sh
yarn add --dev @chanzuckerberg/story-utils
```

## Utilities

- [generateSnapshots](#generatesnapshots)
- [getStories](#getstories)
- [prepareStory](#preparestory)

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

### getStories

Get all stories from the local filesystem. Useful for consuming stories in some way in a Node environment.

```js
import { getStories } from '@chanzuckerberg/story-utils';

const stories = getStories('src/components/**/*.stories.tsx');

const storyNames = stories.map((story) => story.name);
console.log('Found stories:', storyNames);
```

Note that this validates the stories it finds, and will throw an error if any of the files don't match [component story format](https://storybook.js.org/docs/react/api/csf).

### prepareStory

Take a story and return its React elements for unit testing.

For example, imagine you have this story

```js
// MyButton.stories.jsx

export const MyStory = (...args) => <Button {...args} />;

MyStory.args = {
  children: 'button!',
};
```

This utility makes it easy to re-use the story in tests.

```js
// MyButton.test.jsx

// Using testing-library to demonstrate.
import { render, screen } from '@testing-library/react';
import { prepareStory } from '@chanzuckerberg/story-utils';
import { MyStory } from './MyButton.stories';

test('my button', () => {
  render(prepareStory(MyStory));
  expect(screen.getByText('button!')).toBeTruthy();
});
```

Overrides for specific args can also be provided, to customize a test.

```js
test('my button 2', () => {
  // Can pass overrides
  render(prepareStory(MyStory, {
    children: 'coffee!',
  }));
  expect(screen.getByText('coffee!')).toBeTruthy();
});
```
