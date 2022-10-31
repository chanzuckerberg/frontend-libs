import type {StoryObj} from '@storybook/react';
import {within} from '@storybook/testing-library';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {rest} from 'msw';
import SFWeather from './SFWeather';

export default {
  component: SFWeather,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const Standard: StoryObj = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <SFWeather />
    </QueryClientProvider>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    // Wait for the API request to finish before doing anything else (such as a11y testing, visual
    // regression testing, etc).
    await canvas.findByText('Current San Francisco temp: 66.6');
  },
  parameters: {
    // Mock out API requests by specifying MSW handlers. See https://mswjs.io/docs/.
    msw: {
      handlers: [
        rest.get('https://api.open-meteo.com/v1/forecast', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({current_weather: {temperature: 66.6}}),
          );
        }),
      ],
    },
  },
};
