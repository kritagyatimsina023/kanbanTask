import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 400) {
  const [debounceValue, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}
