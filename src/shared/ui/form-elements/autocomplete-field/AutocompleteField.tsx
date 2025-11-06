'use client'
import { ChangeEvent, KeyboardEvent, InputHTMLAttributes, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Command, CommandItem, CommandList } from "../../shadcn/command";
import { cn } from "@/shared/lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "../../shadcn/popover";
import { Input } from "../../shadcn/input";

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
  shouldFilter?: boolean
  filterCallback?: (inputValue: string) => (item: string) => boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'onSelect'>

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
  shouldFilter = true,
  filterCallback = inSuggestions,
  ...props
}: TProps) => {

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  const actualValue = useMemo(() => isControlled ? value : internalValue, [internalValue, isControlled, value])

  const handleChange = useCallback((updater: string) => {
    if (!isControlled) setInternalValue(updater)
    onChange?.(updater)

    setOpen(updater?.trim().length >= 2)
  }, [isControlled, onChange])

  // Manage suggestions, if is enabled "shouldFilter" flag, is used filterCallback built-in or custom
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    const filtered = shouldFilter
      ? suggestionList.filter(filterCallback(actualValue))
      : suggestionList

    setSuggestions(filtered)
  }, [actualValue, filterCallback, shouldFilter, suggestionList])

  //Manage select from autocomplete popover
  const handleSelect = useCallback((value: string) => {
    if (!isControlled) setInternalValue(value)
    onSelect?.(value)
    setOpen(false)
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
            {suggestions.map((item, idx) => (
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
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}