import {setupWorker} from 'msw';
import type {RequestHandler} from 'msw';
import {setupServer} from 'msw/node';

const isBrowser = global && typeof global.process === 'undefined';

/**
 * Create a Mock Service Worker instance that works in both Browser and Node environments.
 * @see https://mswjs.io/docs/
 */
export function createMockWorker(initialHandlers: RequestHandler[] = []) {
  if (isBrowser) {
    const worker = setupWorker(...initialHandlers);

    return {
      start: worker.start,
      stop: worker.stop,
      use: worker.use,
      resetHandlers: worker.resetHandlers,
    };
  }

  const worker = setupServer(...initialHandlers);

  return {
    start: worker.listen,
    stop: worker.close,
    use: worker.use,
    resetHandlers: worker.resetHandlers,
  };
}
