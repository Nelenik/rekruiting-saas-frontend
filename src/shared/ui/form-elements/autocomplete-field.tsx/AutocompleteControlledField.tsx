import { cn } from "@/shared/lib/utils";
import { CommandList, CommandItem, Command } from "cmdk";
import { InputHTMLAttributes, Ref, useImperativeHandle, KeyboardEvent } from "react";
import { Input } from "../../shadcn/input";
import { Popover, PopoverAnchor, PopoverContent } from "../../shadcn/popover";
import { useAutocompleteCore } from "./useAutoCompleteCore";
import SpinnerBulletSvg from '@/assets/icons/spinner1.svg?rc'

type TProps = {
  ref?: Ref<HTMLInputElement>,
  popoverStyles?: string,
  onItemSelect?: (value: string) => void,
  value?: string,
  suggestionsList: string[]
  onEnterConfirm?: (value: string, e: KeyboardEvent<HTMLElement>) => void;
  isFetching?: boolean
}
  & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>

export const AutocompleteControlledField = ({
  ref,
  className,
  popoverStyles,
  value,
  isFetching,
  suggestionsList,
  onEnterConfirm,
  onItemSelect,
  onChange = () => { },
  onKeyDown = () => { },
  ...props }: TProps) => {
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
    value,
    suggestionsList,
    onEnterConfirm,
    onItemSelect,
    shouldFilter: false
  });

  // Connect the outer ref to the internal input ref.
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [inputRef])

  return (
    <Popover open={open} onOpenChange={(state) => { if (!state) setActiveIndex(null) }}>
      <PopoverAnchor asChild>
        <Input
          {...props}
          ref={inputRef}
          onChange={onChange}
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
            {isFetching
              ? <div>
                <SpinnerBulletSvg
                  className="mx-auto fill-primary"
                />
              </div>
              : suggestions.map((item, idx) => (
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