import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";

/**
 * Default filter function for autocomplete suggestions.
 * Returns a predicate function that checks if the suggestion
 * matches the input string (case-insensitive, special characters escaped).
 *
 * @param input - The current input string.
 * @returns A function that takes a suggestion and returns true if it matches.
 */
const inSuggestions =
  (input: string) =>
  (item: string): boolean => {
    const regex = new RegExp(
      input.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );
    return regex.test(item);
  };

type TAutocompleteFieldHook = {
  /** Value of the input. */
  value?: string;
  /** List of suggestion strings to filter from. */
  suggestionsList: string[];
  /** Boolean that enables inner filtering */
  shouldFilter?: boolean;
  /**
   * Callback triggered when user presses Enter while the popover is closed.
   * Useful to "confirm" the current input value.
   */
  onEnterConfirm?: (value: string, e: KeyboardEvent<HTMLElement>) => void;
  /**
   * Callback triggered when a suggestion is selected from the popover.
   */
  onSelect?: (value: string) => void;
  /**
   * Custom filter callback for suggestions.
   * Receives the input string and should return a predicate function for filtering.
   */
  filterCallback?: (input: string) => (item: string) => boolean;
};

/**
 * Custom hook managing autocomplete input state.
 *
 * @param value - Initial value for the input.
 * @param suggestionsList - List of all possible suggestions.
 * @param onEnterConfirm - Callback when user confirms input via Enter with popover closed, receives the input value and event object.
 * @param onSelect - Callback when user selects a suggestion.
 * @param filterCallback - Function to filter suggestions.
 *
 * @returns Object containing input state, suggestions, popover state, and handlers.
 */
export const useAutocompleteCore = ({
  value = "",
  shouldFilter,
  suggestionsList,
  onEnterConfirm = () => {},
  onSelect = () => {},
  filterCallback = inSuggestions,
}: TAutocompleteFieldHook) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const delayRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!shouldFilter) {
      setSuggestions(suggestionsList);
      setOpen(suggestionsList.length > 0 && value.trim().length > 0);
    }
  }, [value, suggestionsList, shouldFilter]);

  //clear timer on unmount
  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, []);

  // --- ResizeObserver for popoover width ---
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>();

  useEffect(() => {
    if (!inputRef.current) return;

    const observer = new ResizeObserver(() => {
      if (inputRef.current) setPopoverWidth(inputRef.current.clientWidth);
    });

    observer.observe(inputRef.current);

    // Убираем наблюдателя при размонтировании
    return () => observer.disconnect();
  }, []);

  //manage input value change with enabled filtration
  const handleChange = useCallback(
    (value: string) => {
      if (shouldFilter) {
        if (delayRef.current) clearTimeout(delayRef.current);

        delayRef.current = setTimeout(() => {
          const filtered = suggestionsList.filter(filterCallback(value));

          setSuggestions(filtered);
          // setActiveIndex(0);
          setOpen(value.trim().length > 0 && filtered.length > 0);
        }, 300);
      }
    },
    [filterCallback, shouldFilter, suggestionsList]
  );

  //manage select from autocomplete popover
  const handleSelect = useCallback(
    (value: string) => {
      onSelect(value);
      setOpen(false);
      setActiveIndex(null);
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    <T extends HTMLElement>(e: KeyboardEvent<T>) => {
      if (open && suggestions.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((i) =>
            i === null ? 0 : (i + 1) % suggestions.length
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex(
            (i) => ((i ?? 0) - 1 + suggestions.length) % suggestions.length
          );
        } else if (e.key === "Enter" && activeIndex !== null) {
          e.preventDefault();
          handleSelect(suggestions[activeIndex]);
        } else if (e.key === "Enter" && activeIndex === null) {
          onEnterConfirm(value, e);
        }
      } else if (e.key === "Enter") {
        onEnterConfirm(value, e);
      }
    },
    [activeIndex, handleSelect, value, onEnterConfirm, open, suggestions]
  );

  return {
    suggestions,
    popoverWidth,
    open,
    setOpen,
    activeIndex,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleChange,
    setActiveIndex,
  };
};
