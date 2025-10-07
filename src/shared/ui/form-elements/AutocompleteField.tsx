'use client'
import { cn } from "@/shared/lib/utils";
import { Command, CommandItem, CommandList } from "@/shared/ui/shadcn/command";
import { Input } from "@/shared/ui/shadcn/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/shared/ui/shadcn/popover";
import { useState, useRef, FormEvent, useEffect, KeyboardEvent, InputHTMLAttributes, useImperativeHandle, Ref, useCallback } from "react";

/**
 * Default filter function for autocomplete suggestions.
 * Returns a predicate function that checks if the suggestion
 * matches the input string (case-insensitive, special characters escaped).
 *
 * @param input - The current input string.
 * @returns A function that takes a suggestion and returns true if it matches.
 */
const inSuggestions = (input: string) => (item: string): boolean => {
  const regex = new RegExp(
    input.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "i"
  );
  return regex.test(item)
}

type TAutocompleteFieldHook = {
  /** Default value of the input. */
  defaultValue?: string,
  /** List of suggestion strings to filter from. */
  suggestionsList: string[],
  /**
   * Callback triggered when user presses Enter while the popover is closed.
   * Useful to "confirm" the current input value.
   */
  onEnterConfirm?: (value: string, e: KeyboardEvent) => void,
  /**
   * Callback triggered when a suggestion is selected from the popover.
   */
  onSelect?: (value: string) => void,
  /**
   * Custom filter callback for suggestions.
   * Receives the input string and should return a predicate function for filtering.
   */
  filterCallback?: (input: string) => (item: string) => boolean;
}

/**
 * Custom hook managing autocomplete input state.
 *
 * @param defaultValue - Initial value for the input.
 * @param suggestionsList - List of all possible suggestions.
 * @param onEnterConfirm - Callback when user confirms input via Enter with popover closed, receives the input value and event object.
 * @param onSelect - Callback when user selects a suggestion.
 * @param filterCallback - Function to filter suggestions.
 *
 * @returns Object containing input state, suggestions, popover state, and handlers.
 */
const useAutocompleteField = ({
  defaultValue = '',
  suggestionsList = [],
  onEnterConfirm = () => { },
  onSelect = () => { },
  filterCallback = inSuggestions

}: TAutocompleteFieldHook) => {

  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState(suggestionsList)
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const [inputValue, setInputValue] = useState(defaultValue ?? '')
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>();

  const delayRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)


  // --- ResizeObserver for popoover width ---
  useEffect(() => {
    if (!inputRef.current) return;

    const observer = new ResizeObserver(() => {
      if (inputRef.current) setPopoverWidth(inputRef.current.clientWidth);
    });

    observer.observe(inputRef.current);

    // Убираем наблюдателя при размонтировании
    return () => observer.disconnect();
  }, []);

  //manage input value change
  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
    if (delayRef.current) clearTimeout(delayRef.current)

    delayRef.current = setTimeout(() => {
      const filtered = suggestionsList.filter(filterCallback(value)
      )

      setSuggestions(filtered)
      setActiveIndex(0)
      setOpen(value.trim().length > 0 && filtered.length > 0)
    }, 150)

  }, [filterCallback, suggestionsList])

  //clear timer on unmount
  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current)
    }
  }, [])

  //manage select from autocomplete popover
  const handleSelect = useCallback((value: string) => {
    setInputValue(value)
    onSelect(value)
    setOpen(false)
    setActiveIndex(null)
  }, [onSelect])

  const onOpenPopoverKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i === null ? 0 : (i + 1) % suggestions.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => ((i ?? 0) - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex !== null) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    }

  }, [activeIndex, handleSelect, open, suggestions]
  )
  //manage navigation in content using arrows
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (open) {
      onOpenPopoverKeyDown(e)
    } else {
      if (e.key === 'Enter') {
        onEnterConfirm(inputValue, e)
      }
    }
  }, [inputValue, onEnterConfirm, onOpenPopoverKeyDown, open])



  return {
    suggestions,
    inputValue,
    popoverWidth,
    open,
    setOpen,
    activeIndex,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleChange,
    setActiveIndex
  }
}

type TProps = { ref?: Ref<HTMLInputElement>, popoverStyles?: string, onItemSelect?: (value: string) => void }
  & TAutocompleteFieldHook
  & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>

/**
 * Autocomplete input field with suggestions popover.
 *
 * Features:
 * - Keyboard navigation with arrow keys and Enter
 * - Suggestion filtering with customizable filter
 * - Automatic popover width matching input width via ResizeObserver
 * - Callbacks for selection (`onSelect`) and confirmation (`onConfirm`)
 *
 * @param defaultValue - Initial value of the input
 * @param suggestionsList - List of suggestions
 * @param onEnterConfirm - Callback triggered when the user confirms input by pressing Enter while the popover is closed. Receives the current input value and the keyboard event. Calling e.preventDefault() prevents the form from submitting at this field.
 * @param onItemSelect - Called when a suggestion is selected
 * @param filterCallback - Optional custom filter for suggestions
 * @param onChange - Optional input change handler
 * @param onKeyDown - Optional keydown handler
 * @param className - CSS class for the input
 * @param popoverStyles - CSS class for the popover content
 * @param props - Other input props
 */

export const AutocompleteField = ({
  ref,
  className,
  popoverStyles,
  defaultValue,
  suggestionsList = [],
  onEnterConfirm,
  onItemSelect,
  filterCallback,
  onChange = () => { },
  onKeyDown = () => { },
  ...props }: TProps) => {
  const {
    suggestions,
    inputValue,
    popoverWidth,
    open,
    setOpen,
    activeIndex,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleChange,
    setActiveIndex
  } = useAutocompleteField({ defaultValue, suggestionsList, onEnterConfirm, onSelect: onItemSelect, filterCallback });

  // Connect the outer ref to the internal input ref.
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [inputRef])

  return (
    <Popover open={open} onOpenChange={(state) => { if (!state) setActiveIndex(null) }}>
      <PopoverAnchor asChild>
        <Input
          {...props}
          ref={inputRef}
          onChange={(e) => {
            handleChange(e);
            onChange(e)
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
            onKeyDown(e)
          }}
          value={inputValue}
          className={cn(className)}
        />
      </PopoverAnchor>

      <PopoverContent
        {...popoverWidth && { style: { width: `${popoverWidth}px` } }}
        className={cn('p-0', popoverStyles)}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={() => { setOpen(false) }}
        onPointerDownOutside={() => { setOpen(false) }}
      >
        <Command shouldFilter={false} >
          <CommandList>
            {suggestions.map((item, idx) => (
              <CommandItem
                key={item}
                value={item}
                className={cn(idx === activeIndex ? "bg-accent text-accent-foreground" : "")}
                onSelect={(value) => {
                  handleSelect(value)
                  inputRef.current?.focus()
                }}
              >
                {item}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}