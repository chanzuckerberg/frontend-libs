import {useLocation} from '@remix-run/react';
import {useEffect, useRef} from 'react';
import useStableRef from './useStableRef';

/**
 * Execute a callback when the page changes.
 */
export default function usePageChange(
  callback: (nextPath: string, prevPath: string) => void,
): void {
  const callbackRef = useStableRef(callback);
  const prevPathRef = useRef('');
  const location = useLocation();

  useEffect(() => {
    callbackRef.current(location.pathname, prevPathRef.current);
    prevPathRef.current = location.pathname;
  }, [callbackRef, location.pathname]);
}
