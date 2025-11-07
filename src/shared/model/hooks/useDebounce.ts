import { useEffect, useState } from "react";

/**
 * debounce hook
 * @param value
 * @param delay in ms
 * @returns
 */
export const useDebounce = (value: string, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return debounced;
};
