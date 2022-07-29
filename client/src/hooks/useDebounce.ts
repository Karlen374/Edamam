import { useCallback, useRef } from 'react';

function useDebounce(callBack:Function, delay:number) {
  const timer = useRef(null);

  const debouncedCallback = useCallback((...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    // @ts-ignore
    timer.current = setTimeout(() => {
      callBack(...args);
    }, delay);
  }, [callBack, delay]);

  return debouncedCallback;
}

export default useDebounce;
