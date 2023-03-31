/**
 * @jest-environment jsdom
 */

import {installGlobals} from '@remix-run/node';
import {Link, Outlet} from '@remix-run/react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createRemixStub} from './createRemixStub';
import usePageChange from './usePageChange';

// Ensures globals such as "fetch", "Response", "Request", and "Headers" are present. These are
// needed by Remix.
installGlobals();

function setup(onPageChange: jest.Mock) {
  function Root() {
    usePageChange(onPageChange);
    return <Outlet />;
  }

  return createRemixStub([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: (
            <div>
              <span>😼</span>
              <Link to="/coffee">coffee</Link>
            </div>
          ),
        },
        {
          path: '/coffee',
          element: (
            <div>
              <span>☕</span>
              <Link to="/cats">cats</Link>
            </div>
          ),
        },
      ],
    },
  ]);
}

it('executes a callback on page change', async () => {
  const user = userEvent.setup();
  const changeSpy = jest.fn();
  const TestComponent = setup(changeSpy);
  render(<TestComponent initialEntries={['/']} />);

  // Starts on the cats page.
  expect(screen.getByText('😼')).toBeInTheDocument();

  // Callback called for initial render.
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(changeSpy).toHaveBeenLastCalledWith('/', '');

  // Navigate to the coffee page.
  await user.click(screen.getByRole('link', {name: 'coffee'}));
  expect(screen.getByText('☕')).toBeInTheDocument();

  // Callback called for the navigation.
  expect(changeSpy).toHaveBeenCalledTimes(2);
  expect(changeSpy).toHaveBeenLastCalledWith('/coffee', '/');
});
