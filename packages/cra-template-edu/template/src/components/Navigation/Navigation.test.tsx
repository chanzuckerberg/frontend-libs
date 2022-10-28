/**
 * @jest-environment jsdom
 */

import {generateSnapshots} from '@chanzuckerberg/story-utils';
import {composeStories} from '@storybook/testing-react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from './Navigation.stories';

const {Home} = composeStories(stories);

generateSnapshots(stories);

it('bolds the active item', async () => {
  render(<Home />);

  const user = userEvent.setup();
  const homeLink = screen.getByRole('link', {name: 'Home'});
  const aboutLink = screen.getByRole('link', {name: 'About'});

  expect(homeLink).toHaveClass('font-bold');
  expect(aboutLink).not.toHaveClass('font-bold');

  await user.click(screen.getByRole('link', {name: 'About'}));

  expect(homeLink).not.toHaveClass('font-bold');
  expect(aboutLink).toHaveClass('font-bold');
});
