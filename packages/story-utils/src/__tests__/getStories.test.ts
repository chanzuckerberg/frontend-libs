import getStories from '../getStories';

test('finding stories', () => {
  const stories = getStories('packages/story-utils/**/*.stories.*');

  expect(stories).toEqual([
    {
      componentTitle: 'Bar',
      name: 'BarStory1',
      parameters: expect.any(Object),
      storyFn: expect.any(Function),
    },
    {
      componentTitle: 'Bar',
      name: 'BarStory2',
      parameters: expect.any(Object),
      storyFn: expect.any(Function),
    },
    {
      componentTitle: 'Foo',
      name: 'FooStory1',
      parameters: expect.any(Object),
      storyFn: expect.any(Function),
    },
    {
      componentTitle: 'Foo',
      name: 'FooStory2',
      parameters: expect.any(Object),
      storyFn: expect.any(Function),
    },
  ]);
});

test('merging parameters', () => {
  const stories = getStories('packages/story-utils/**/foo.stories.*');

  expect(stories).toEqual([
    expect.objectContaining({
      name: 'FooStory1',
      parameters: {
        axe: {
          disabled: true,
          rules: ['color-contrast'],
        },
      },
    }),
    expect.objectContaining({
      name: 'FooStory2',
      parameters: {
        axe: {
          rules: ['color-contrast'],
        },
      },
    }),
  ]);
});
