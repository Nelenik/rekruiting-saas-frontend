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
    value: '',
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
        <Button variant="outline"
          className={cn(
            'justify-start w-[220px] px-2 text--foreground font-normal',
            className,
            'hover:bg-white',
          )}
        >
          <ArrowUpDown />
          {selectValue}
          <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-1"
        align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setOpen(false)
                    onValueChange?.(currentValue)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
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
      className={cn(
        'relative',
        className
      )}
      render={({ filters, updateFilter }) => (
        <>
          <SortingVacanciesField
            value={filters.sort || ''}
            onValueChange={(value: string) => updateFilter({ 'sort': value })}
            className=""
          />
        </>
      )}
    />
  );
}