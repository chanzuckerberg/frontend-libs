import type { Story } from '@storybook/react/types-6-0';

/**
 * Get the React elements for a specific Storybook story, so that the story can be unit tested.
 *
 * If @storybook/react ever provides its own function for doing this, we'll no longer need to
 * provide this. Hopefully resolved in https://github.com/storybookjs/storybook/issues/12079.
 */
export default function prepareStory<Args>(
  /**
   * The specific story to render, written in Component Story Format.
   * @see https://storybook.js.org/docs/react/api/csf#named-story-exports
   */
  story: Story<Args>,
  /**
   * Override any args that the story defines. Useful for using a story for unit tests, while
   * providing specific story args or component props.
   */
  argOverrides?: Partial<Args>,
) {
  const args = {
    ...commonEventHandlers,
    ...story.args,
    ...argOverrides,
  };

  /**
   * Secondary information about a story. In most stories this won't be used, and fake values are
   * provided for most properties.
   */
  const context = {
    id: 'fake',
    kind: 'fake',
    name: 'fake',
    parameters: story.parameters || {},
    args,
    argTypes: {},
    globals: {},
  };

  return story(
    // Weaken type checking for `args`. The Storybook actions addon reads the TypeScript types for
    // the story and provides functions for any event handlers. We can't replicate that process here,
    // and can't guarantee that all required props are present. Therefore, this could easily fail
    // at runtime. That's okay, because this function is for testing purposes. At worst, the test
    // will fail, signalling that a default value should be provided for a prop.
    //
    // On a technical note, we have to cast to `unknown` before `Args`. Because we're adding common
    // event handlers to `args`, its type doesn't overlap enough with `Args` for TypeScript to be
    // comfortable with us directly casting to it.
    (args as unknown) as Args,
    context,
  );
}

/**
 * Common event handlers, from https://reactjs.org/docs/events.html.
 *
 * The [Storybook actions addon](https://storybook.js.org/docs/react/essentials/actions) analyzes
 * the TypeScript types and provides values for any props matching the pattern "onFoo".
 *
 * Unfortunately, there's not currently an easy way to do the same thing outside the context of
 * Storybook.
 *
 * Instead, we'll provide these default values for common functions. This will provide values for
 * many component's event handlers, but not all. For any not covered here, users of `prepareStory`
 * may have to explicitly provide values for event handlers.
 *
 * If @storybook/react ever provides its own function for rendering a story, we'll no longer need
 * to do this. Hopefully resolved in https://github.com/storybookjs/storybook/issues/12079.
 */
const commonEventHandlers = {
  onAnimationStart: () => {},
  onAnimationEnd: () => {},
  onAnimationIteration: () => {},
  onChange: () => {},
  onClick: () => {},
  onContextMenu: () => {},
  onDoubleClick: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
  onDragEnter: () => {},
  onDragExit: () => {},
  onDragLeave: () => {},
  onDragOver: () => {},
  onDragStart: () => {},
  onDrop: () => {},
  onError: () => {},
  onInput: () => {},
  onInvalid: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
  onKeyUp: () => {},
  onLoad: () => {},
  onMouseDown: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseMove: () => {},
  onMouseOut: () => {},
  onMouseOver: () => {},
  onMouseUp: () => {},
  onReset: () => {},
  onScroll: () => {},
  onSelect: () => {},
  onSubmit: () => {},
  onToggle: () => {},
  onTouchCancel: () => {},
  onTouchEnd: () => {},
  onTouchMove: () => {},
  onTouchStart: () => {},
  onTransitionEnd: () => {},
  onWheel: () => {},
};
