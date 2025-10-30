'use client'
import { QueryFilterManager } from "@/features/manage-url-filters";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/shared/ui/shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { ChevronDown, Check, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";


const sortOptions = [
  {
    value: 'default',
    label: 'По умолчанию'
  },
  {
    value: "publication_at",
    label: 'По дате (сначала новые)'
  },
  {
    value: "-publication_at",
    label: 'По дате (сначала старые)'
  },
  {
    value: "name",
    label: 'По имени (А → Я)'
  },
  {
    value: "-name",
    label: 'По имени (Я → А)'
  }
]

type TSortingFieldProps = {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void
}

const SortingVacanciesField = ({
  value,
  onValueChange,
  className
}: TSortingFieldProps) => {
  const [open, setOpen] = useState(false)

  const [selectValue, setSelectValue] = useState('Сортировка')

  useEffect(() => {
    const label = sortOptions.find((option) => option.value === value)?.label
    const selectedLabel = label === 'По умолчанию' || !label ? 'Сортировка' : label
    setSelectValue(selectedLabel)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost"
          className={cn(
            'justify-start text-base w-max px-0 text--foreground font-normal',
            className,
            'hover:bg-white',
          )}
        >
          <ArrowUpDown />
          {selectValue}
          <ChevronDown className={cn(
            "h-4 w-4 opacity-50 ml-auto transition-transform",
            open && 'rotate-180'
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-max p-0 rounded-lg shadow-none border-accent2/40 overflow-hidden"
        align="start"
      >
        <Command value={value || ''}>
          <CommandList>
            <CommandGroup>
              {sortOptions.map((option) => {
                const normalizedValue = value === '' ? 'default' : value
                const isChecked = normalizedValue === option.value
                return (
                  <CommandItem
                    key={option.value}
                    className={cn("text-xs", isChecked && 'font-semibold')}
                    {...isChecked && { tabIndex: 0 }}
                    value={option.value}
                    onSelect={(currentValue) => {
                      const newValue = currentValue === 'default' ? '' : currentValue
                      setOpen(false)
                      onValueChange?.(newValue)
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        isChecked ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type TProps = {
  className?: string
}
export const SortingVacancies = ({ className }: TProps) => {
  return (
    <QueryFilterManager
      render={({ filters, updateFilter }) => (
        <div className={cn(
          'relative',
          className
        )}>
          <SortingVacanciesField
            value={filters.sort || ''}
            onValueChange={(value: string) => updateFilter({ 'sort': value })}
            className=""
          />
        </div>
      )}
    />
  );
}