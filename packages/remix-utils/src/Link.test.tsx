/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react';
import Link from './Link';
import {RemixStub} from './createRemixStub';

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
