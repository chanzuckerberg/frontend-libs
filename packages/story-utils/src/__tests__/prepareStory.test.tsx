/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import prepareStory from '../prepareStory';

test('no args', () => {
  const Story = () => <button>brew</button>;

  render(prepareStory(Story));
  expect(screen.getByRole('button', { name: 'brew' })).toBeTruthy();
});

test('args', () => {
  type Args = { children: React.ReactNode };
  const Story = (args: Args) => <button {...args} />;
  Story.args = { children: 'hiya' };

  render(prepareStory(Story));
  expect(screen.getByRole('button', { name: 'hiya' })).toBeTruthy();
});

test('args and overrides', () => {
  type Args = { children: React.ReactNode };
  const Story = (args: Args) => <button {...args} />;
  Story.args = { children: 'hiya' };

  render(prepareStory(Story, { children: 'byeya' }));
  expect(screen.getByRole('button', { name: 'byeya' })).toBeTruthy();
});
