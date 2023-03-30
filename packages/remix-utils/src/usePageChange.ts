import {useLocation} from '@remix-run/react';
import {useEffect, useRef} from 'react';

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

/**
 * Create a ref pointing to a value, and keep the ref updated with the latest value.
 *
 * Think of this ref like a pointer, or a Ruby instance variable.
 *
 * Basically a convenience wrapper combining a `useRef` and a `useEffect`. Most useful for
 * referencing something mutable in a `useEffect` without worrying about tearing the effect down
 * and setting it back up.
 *
 * @example
 * const callbackRef = useStableRef(callback);
 *
 * useEffect(() => {
 *   // Use your ref
 *   callbackRef.current();
 * }, [callbackRef]);
 */
function useStableRef<T>(val: T) {
  const ref = useRef(val);
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref;
}
