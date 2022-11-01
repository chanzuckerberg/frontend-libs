import {initialize as initializeMSW, mswDecorator} from 'msw-storybook-addon';
import '../src/index.css';

// Setup Mock Service Worker, for mocking network requests.
initializeMSW();

export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
