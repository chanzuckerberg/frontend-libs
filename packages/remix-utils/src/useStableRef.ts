import {useEffect, useRef} from 'react';

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
export default function useStableRef<T>(val: T) {
  const ref = useRef(val);
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref;
}
