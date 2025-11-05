import { InputHTMLAttributes, Ref, useState, KeyboardEvent, useImperativeHandle } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "../../shadcn/popover";
import { Input } from "../../shadcn/input";
import { cn } from "@/shared/lib/utils";
import { CommandList, CommandItem, Command } from "cmdk";
import { useAutocompleteCore } from "./useAutoCompleteCore";
import { useDebounce } from "@/shared/model/hooks/useDebounce";

type TProps = {
  ref?: Ref<HTMLInputElement>,
  popoverStyles?: string,
  onItemSelect?: (value: string) => void,
  suggestionsList: string[]
  onEnterConfirm?: (value: string, e: KeyboardEvent<HTMLElement>) => void;
  defaultValue?: string,
  filterCallback?: (input: string) => (item: string) => boolean;
}
  & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>

export const AutocompleteUncontrolledField = ({
  ref,
  popoverStyles,
  className,
  onItemSelect = () => { },
  suggestionsList,
  defaultValue,
  onEnterConfirm,
  filterCallback,
  onChange = () => { },
  onKeyDown = () => { },
  ...props

}: TProps) => {
  const [value, setValue] = useState(defaultValue || '')

  const debounced = useDebounce(value, 150)

  const {
    suggestions,
    popoverWidth,
    open,
    setOpen,
    activeIndex,
    inputRef,
    handleKeyDown,
    handleSelect,
    setActiveIndex
  } = useAutocompleteCore({
    value: debounced,
    suggestionsList,
    onEnterConfirm,
    onItemSelect: setValue,
    shouldFilter: true,
    filterCallback
  });

  // Connect the outer ref to the internal input ref.
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [inputRef])

  return (
    <Popover open={open} onOpenChange={(state) => { if (!state) setActiveIndex(null) }}>
      <PopoverAnchor asChild>
        <Input
          {...props}
          ref={inputRef}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e)
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
            onKeyDown(e)
          }}
          value={value}
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
                  onItemSelect(value)
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