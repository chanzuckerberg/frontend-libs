import type {StoryObj} from '@storybook/react';
import {within} from '@storybook/testing-library';
import {rest} from 'msw';
import WithMockRequests from '../../testing/WithMockRequests';
import SFWeather from './SFWeather';

export default {
  component: SFWeather,
};

const handlers = [
  rest.get('https://api.open-meteo.com/v1/forecast', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({current_weather: {temperature: 66.6}}),
    );
  }),
];

export const Standard: StoryObj = {
  render: () => (
    <WithMockRequests requestHandlers={handlers}>
      <SFWeather />
    </WithMockRequests>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    // Wait for the API request to finish before doing anything else (such as a11y testing, visual
    // regression testing, etc).
    await canvas.findByText('Current San Francisco temp: 66.6');
  },
};
