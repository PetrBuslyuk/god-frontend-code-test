import { useEffect, useState } from "react";

/**
 * Hook emits value with delay preventing
 *
 * @param value - value to emit
 * @param delay - delay in ms
 */
export const useDebounce = <T = unknown>(value: T, delay: number) =>  {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value]
  );

  return debouncedValue;
}
