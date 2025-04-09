"use client";
import { useEffect, useState } from "react";

/**
 * Custom hook that listens for changes in the media query match status.
 * It returns a boolean value indicating whether the current window matches the provided media query.
 *
 * @param {string} mediaQueryString - The media query string to match against the current window size.
 * @returns {boolean} - A boolean value indicating whether the media query matches the current window size.
 *
 * @example
 * const isMobile = useMatchMedia('(max-width: 768px)');
 *
 * if (isMobile) {
 *   // Execute logic for mobile view
 * } else {
 *   // Execute logic for desktop view
 * }
 */
export const useMathcMedia = (mediaQueryString: string): boolean => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(mediaQueryString);

      setMatch(mediaQuery.matches);

      // change statie if screen size changes
      const handleChange = (event: MediaQueryListEvent) => {
        setMatch(event.matches);
      };

      // subscribe to media query changes
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [mediaQueryString]);
  return match;
};
