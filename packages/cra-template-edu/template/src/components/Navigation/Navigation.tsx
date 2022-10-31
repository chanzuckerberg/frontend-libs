import clsx from 'clsx';
import {Link, useLocation} from 'react-router-dom';

const baseLinkClasses = 'p-1 text-blue-600 hover:underline';
const currentLinkClasses = 'font-bold italic';

export default function Navigation() {
  const location = useLocation();
  return (
    <nav className="px-5 pt-5">
      <Link
        className={clsx(
          baseLinkClasses,
          location.pathname === '/' && currentLinkClasses,
        )}
        to="/"
      >
        Home
      </Link>
      <Link
        className={clsx(
          baseLinkClasses,
          location.pathname === '/about' && currentLinkClasses,
        )}
        to="/about"
      >
        About
      </Link>
    </nav>
  );
}
