/**
 * @jest-environment jsdom
 */

import {unstable_createRemixStub as createRemixStub} from '@remix-run/testing';
import {render, screen} from '@testing-library/react';
import type {ReactNode} from 'react';
import Link from './Link';

function RemixStub(props: {children: ReactNode}) {
  const RemixedStub = createRemixStub([
    {
      path: '/',
      element: props.children,
    },
  ]);
  return <RemixedStub />;
}

it('is an anchor', () => {
  render(
    <RemixStub>
      <Link to="/some/where">Over the rainbow</Link>
    </RemixStub>,
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAccessibleName('Over the rainbow');
  expect(link.getAttribute('href')).toEqual('/some/where');
});
