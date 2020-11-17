# stories-utils

Utilities for using [Storybook stories](https://storybook.js.org/docs/react/get-started/whats-a-story) in non-Storybook environments. For example, using stories in Jest tests.

## Installation

Install @chanzuckerberg/stories-utils with your favorite package manager. With yarn, that would look like

```sh
yarn add --dev @chanzuckerberg/stories-utils
```

## Utilities

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
import { prepareStory } from '@chanzuckerberg/stories-utils';
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
