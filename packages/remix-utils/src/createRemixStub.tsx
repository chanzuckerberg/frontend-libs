import type {AgnosticRouteObject} from '@remix-run/router';
import {unstable_createRemixStub as createRemixStub} from '@remix-run/testing';
import type {ReactNode} from 'react';

export {
  /**
   * Create a RemixStub wrapper-component for rendering routing components. Especially useful for
   * [nested routes](https://remix.run/docs/en/v1/guides/routing#what-is-nested-routing).
   *
   * @example
   * const RemixStub = createRemixStub([
   *   {
   *     path: '/cats',
   *     element: <CatsPage />,
   *     loader: catsLoader,
   *     children: [
   *       {
   *         index: true,
   *         element: <CatsIndex />,
   *         loader: catsIndexLoader,
   *       },
   *     ],
   *   },
   * ]);
   *
   * return <RemixStub />;
   */
  createRemixStub,
};

type Props = {
  children: ReactNode;
  /** Loader function providing data to the route. @see https://remix.run/docs/en/v1/route/loader */
  loader?: AgnosticRouteObject['loader'];
  /** Action function handling data mutation. @see https://remix.run/docs/en/v1/route/action */
  action?: AgnosticRouteObject['action'];
};

/**
 * Simplified Remix stub for rendering routing components or components using Remix hooks like
 * `useLocation`.
 *
 * Not appropriate for [nested routes](https://remix.run/docs/en/v1/guides/routing#what-is-nested-routing).
 * For those, use `createRemixStub` from this same file.
 *
 * @example
 * <RemixStub loader={catsLoader}>
 *   <CatsPage />
 * </RemixStub>
 */
export function RemixStub(props: Props) {
  const RemixedStub = createRemixStub([
    {
      path: '/',
      element: props.children,
      loader: props.loader,
      action: props.action,
    },
  ]);

  return <RemixedStub />;
}
