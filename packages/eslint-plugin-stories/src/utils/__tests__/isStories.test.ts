import isStories from '../isStories';

test('non-stories files', () => {
  expect(isStories('path/to/a/component.tsx')).toEqual(false);
  expect(isStories('path/to/a/component.jsx')).toEqual(false);
  expect(isStories('path/to/a/util.ts')).toEqual(false);
  expect(isStories('path/to/a/util.js')).toEqual(false);
});

test('stories files', () => {
  expect(isStories('path/to/a/component.stories.tsx')).toEqual(true);
  expect(isStories('path/to/a/component.stories.jsx')).toEqual(true);
  expect(isStories('path/to/a/util.stories.ts')).toEqual(true);
  expect(isStories('path/to/a/util.stories.js')).toEqual(true);
});
