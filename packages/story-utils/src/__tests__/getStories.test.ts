import os from 'os';
import mockFs from 'mock-fs';
import getAllStories from '../getStories';

afterEach(() => {
  mockFs.restore();
});

/**
 * Only run these tests on Mac, which is unfortunate... 😞
 *
 * mock-fs mocks out the filesystem. It works great on all platforms for anything using the `fs`
 * module. However, it only seems to mock `require` calls effectively on MacOS. These tests pass
 * locally, but fail on CI on Ubuntu and Windows.
 *
 * Possibly related to https://github.com/tschaub/mock-fs/issues/312.
 *
 * An alternative would be to use Jest's module mocking to directly mock the `glob.sync` call and
 * calls to `require` for the individual story files. Doing so would likely work on all platforms,
 * but wouldn't be as good of a test since it mocks implementation details about `getStories`.
 */
const describeMacOnly = os.platform() === 'darwin' ? describe : describe.skip;

describeMacOnly('getStories', () => {
  test('finding stories', () => {
    mockFs({
      src: {
        components: {
          a: {
            'bar.stories.tsx': `
              export default {
                title: 'Bar',
                component: () => 'bar',
              };

              export const BarStory1 = () => 'bar story 1';
            `,
            'foo.stories.tsx': `
              export default {
                title: 'Foo',
                component: () => 'foo',
              };

              export const FooStory1 = () => 'foo story 1';
              export const FooStory2 = () => 'foo story 2';
            `,
          },
          b: {
            'baz.stories.tsx': `
              export default {
                title: 'Baz',
                component: () => 'baz',
              };

              export const BazStory1 = () => 'baz story 1';
            `,
          },
        },
      },
    });

    const stories = getAllStories();

    expect(stories).toEqual([
      {
        componentTitle: 'Bar',
        name: 'BarStory1',
        parameters: {},
        storyFn: expect.any(Function),
      },
      {
        componentTitle: 'Foo',
        name: 'FooStory1',
        parameters: {},
        storyFn: expect.any(Function),
      },
      {
        componentTitle: 'Foo',
        name: 'FooStory2',
        parameters: {},
        storyFn: expect.any(Function),
      },
      {
        componentTitle: 'Baz',
        name: 'BazStory1',
        parameters: {},
        storyFn: expect.any(Function),
      },
    ]);
  });

  test('looking in a specific directory', () => {
    mockFs({
      src: {
        components: {
          a: {
            'foo.stories.tsx': `
              export default {
                title: 'Foo',
                component: () => 'foo',
              };

              export const FooStory1 = () => 'foo story 1';
            `,
          },
          b: {
            'baz.stories.tsx': `
              export default {
                title: 'Baz',
                component: () => 'baz',
              };

              export const BazStory1 = () => 'baz story 1';
            `,
          },
        },
      },
    });

    const stories = getAllStories('src/components/b/**/*.*');

    expect(stories).toEqual([
      {
        componentTitle: 'Baz',
        name: 'BazStory1',
        parameters: {},
        storyFn: expect.any(Function),
      },
    ]);
  });

  test('merging parameters', () => {
    mockFs({
      src: {
        components: {
          'foo.stories.tsx': `
            export default {
              title: 'Foo',
              component: () => 'foo',
              parameters: {
                axe: {
                  rules: ['color-contrast'],
                },
              },
            };

            export const FooStory1 = () => 'foo story 1';
            FooStory1.parameters = {
              axe: {
                disabled: true,
              },
            };

            export const FooStory2 = () => 'foo story 2';
          `,
        },
      },
    });

    const stories = getAllStories();

    expect(stories).toEqual([
      {
        componentTitle: 'Foo',
        name: 'FooStory1',
        parameters: {
          axe: {
            disabled: true,
            rules: ['color-contrast'],
          },
        },
        storyFn: expect.any(Function),
      },
      {
        componentTitle: 'Foo',
        name: 'FooStory2',
        parameters: {
          axe: {
            rules: ['color-contrast'],
          },
        },
        storyFn: expect.any(Function),
      },
    ]);
  });
});
