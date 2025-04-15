import { useRef, useEffect } from "react";

export const useLocalStorageRef = <T>(key: string, initialValue: T) => {
  const ref = useRef<T>(initialValue);

  // Init on mount
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        ref.current = JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing localStorage value:", e);
      }
    }
  }, [key]);

  // Listen changes in the localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          ref.current = JSON.parse(e.newValue);
        } catch (e) {
          console.error("Error parsing localStorage value:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  const setValue = (value: T) => {
    ref.current = value;
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [ref, setValue] as const;
};
