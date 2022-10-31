import type {StoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';
import Navigation from './Navigation';

export default {
  component: Navigation,
};

type Args = {currentRoute: string};

export const Home: StoryObj<Args> = {
  render: (args) => (
    <MemoryRouter initialEntries={[args.currentRoute]}>
      <Navigation />
    </MemoryRouter>
  ),
  args: {
    currentRoute: '/',
  },
};

export const About: StoryObj<Args> = {
  ...Home,
  args: {
    currentRoute: '/about',
  },
};
