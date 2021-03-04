/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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
    skip: true,
  },
};

export const FooStory2 = () => 'foo story 2';
