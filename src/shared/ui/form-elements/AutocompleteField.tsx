'use client'
import { ChangeEvent, KeyboardEvent, InputHTMLAttributes, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Command, CommandItem, CommandList } from "../shadcn/command";
import { cn } from "@/shared/lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "../shadcn/popover";
import { Input } from "../shadcn/input";
import { CommandLoading } from "cmdk";

const inSuggestions =
  (inputValue: string) =>
    (item: string): boolean => {
      const regex = new RegExp(
        inputValue.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
      return regex.test(item);
    };


type TProps = {
  ref?: Ref<HTMLInputElement>,
  defaultValue?: string,
  value?: string,
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  onEnterConfirm?: (value: string, e: KeyboardEvent) => void,
  suggestionList: string[]
  className?: string
  popoverStyles?: string
  shouldFilter: boolean
  isFetching?: boolean //for async suggestions
  filterCallback?: (inputValue: string) => (item: string) => boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'onSelect'>

/**
 * AutocompleteField is a text input with an optional popover showing suggestions.
 * 
 * This component supports both controlled and uncontrolled usage:
 * - **Controlled**: provide `value` and `onChange` to fully control the input state.
 * - **Uncontrolled**: provide `defaultValue` and allow the component to manage its own state.
 * 
 * Suggestions are filtered based on user input, using a default or custom filter function.
 * The popover opens only when there are suggestions and the input length exceeds a configurable minimum.
 * 
 * Keyboard support:
 * - ArrowDown / ArrowUp to navigate suggestions.
 * - Enter to select an active suggestion or confirm input if no suggestion is active.
 * - Escape closes the popover.
 * 
 * @param ref Optional React ref forwarded to the internal input element.
 * @param defaultValue Initial value for uncontrolled mode.
 * @param value Value for controlled mode.
 * @param onChange Callback invoked when the input value changes.
 * @param onSelect Callback invoked when a suggestion is selected.
 * @param onEnterConfirm Callback invoked when Enter is pressed without selecting a suggestion.
 * @param suggestionList Array of suggestion strings to display in the popover.
 * @param className Optional additional className for the input element.
 * @param popoverStyles Optional additional className or styles for the popover content.
 * @param shouldFilter Whether to filter suggestions based on input. Defaults to true.
 * @param filterCallback Custom function to filter suggestions. Receives the input value and returns a predicate function.
 * @param isFetching For async lists
 * @param props Additional standard Input HTML attributes excluding `value`, `defaultValue`, `onChange`, and `onSelect`.
 *
 * @example
 * <AutocompleteField
 *   defaultValue="apple"
 *   suggestionList={['apple', 'banana', 'orange']}
 *   onSelect={(val) => console.log('Selected:', val)}
 * />
 *
 * @example
 * // Controlled usage
 * const [value, setValue] = useState('');
 * <AutocompleteField
 *   value={value}
 *   onChange={setValue}
 *   suggestionList={['apple', 'banana', 'orange']}
 * />
 */

export const AutocompleteField = ({
  ref,
  defaultValue,
  value,
  onChange,
  onSelect,
  onEnterConfirm,
  suggestionList,
  className,
  popoverStyles,
  shouldFilter,
  filterCallback = inSuggestions,
  isFetching = false,
  ...props
}: TProps) => {

  const [open, setOpen] = useState(false)
  // 
  const [pendingOpen, setPendingOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement | null>(null)

  const isControlled = value !== undefined
  // The internal value for uncontrolled variant
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  // The actual value depends on whether the field is controlled or not.
  const actualValue = useMemo(() => isControlled ? value : internalValue, [internalValue, isControlled, value])

  // Reset active index when suggestions changes
  useEffect(() => setActiveIndex(null), [suggestions]);

  // Manage onChange logic. Opens suggestions only on input interactions
  const handleChange = useCallback((updater: string) => {
    if (!isControlled) setInternalValue(updater)
    onChange?.(updater)

    setPendingOpen(updater.trim().length >= 1)
  }, [isControlled, onChange])

  // Manage suggestions, if is enabled "shouldFilter" flag, is used filterCallback built-in or custom
  useEffect(() => {
    const filtered = shouldFilter
      ? suggestionList.filter(filterCallback(actualValue))
      : suggestionList

    setSuggestions(filtered)
  }, [actualValue, filterCallback, shouldFilter, suggestionList])

  // Manage opening if value changed on change event and if suggestions length > 0
  useEffect(() => {
    if (pendingOpen && suggestions.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [pendingOpen, suggestions.length])

  //Manage select from autocomplete popover
  const handleSelect = useCallback((value: string) => {
    if (!isControlled) setInternalValue(value)
    onSelect?.(value)
    setOpen(false)
    setPendingOpen(false)
    inputRef.current?.focus()
  }, [isControlled, onSelect])


  // Manage keyboard controls on keydown event
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (open && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i === null ? 0 : (i + 1) % suggestions.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => ((i ?? 0) - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === "Enter" && activeIndex !== null) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      } else if (e.key === 'Enter' && activeIndex === null) {
        onEnterConfirm?.(actualValue, e)
      }
    } else if (e.key === "Enter") {
      onEnterConfirm?.(actualValue, e)
    }
  }, [activeIndex, actualValue, handleSelect, onEnterConfirm, open, suggestions])


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

  // Connect the outer ref to the internal input ref.
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [inputRef])

  return (
    <Popover open={open} onOpenChange={(state) => {
      if (!state) setActiveIndex(null)
    }}>
      <PopoverAnchor asChild>
        <Input
          value={actualValue}
          ref={inputRef}
          className={cn(className)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          {...props}
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
            {isFetching
              ? <CommandLoading />
              : suggestions.map((item, idx) => (
                <CommandItem
                  key={item + idx}
                  value={item}
                  className={cn(
                    idx === activeIndex ? "bg-accent text-accent-foreground" : ""
                  )}
                  onSelect={handleSelect}
                >
                  {item}
                </CommandItem>
              ))
            }
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}