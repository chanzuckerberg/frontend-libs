import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {RequestHandler} from 'msw';
import {useLayoutEffect, type ReactNode} from 'react';
import {createMockWorker} from './createMockWorker';

type Props = {
  children?: ReactNode;
  /**
   * Function specifying whether an outgoing request should be mocked, and what the mocked response
   * should be.
   * @see https://mswjs.io/docs/basics/request-handler
   */
  requestHandlers: RequestHandler[];
};

const worker = createMockWorker();

// If we're in a test environment, start the worker before all tests. Otherwise, immediately start.
if (typeof beforeAll !== 'undefined') {
  beforeAll(() => {
    worker.start();
  });
} else {
  worker.start();
}

// If we're in a test environment, stop the worker after all tests.
if (typeof afterAll !== 'undefined') {
  afterAll(() => {
    worker.stop();
  });
}

/**
 * **_For stories and tests only_**.
 *
 * Wrapping component to mock out network requests.
 *
 * @see https://mswjs.io/
 */
export default function WithMockRequests({
  children = null,
  requestHandlers,
}: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  useLayoutEffect(() => {
    // Reset any existing handlers and add the new ones. This is done in one step instead of
    // resetting in the cleanup function, because the cleanup of the previous component can happen
    // after the next one has been setup. If that happens, any request handlers will be clobbered.
    worker.resetHandlers(...requestHandlers);
  }, [requestHandlers]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
