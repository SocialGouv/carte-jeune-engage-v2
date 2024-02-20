import { useEffect, useState } from "react";

export default function useDebounceValueWithState(
  value: string,
  delay: number
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncePending, setIsDebouncePending] = useState(false);

  useEffect(() => {
    setIsDebouncePending(true); // Indicate debounce start
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncePending(false); // Reset when debounce period is over
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsDebouncePending(false); // Ensure reset if component unmounts or value changes
    };
  }, [value, delay]); // Effect runs on value or delay change

  return [debouncedValue, isDebouncePending] as const;
}
