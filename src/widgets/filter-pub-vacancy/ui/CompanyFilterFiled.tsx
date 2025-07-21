'use client'

import { cn } from "@/shared/lib/utils"
import { usePathFilters } from "../model/PathFiltersProvider"
import FormItem from "@/shared/ui/FormItem"
import { CancelButton } from "@/shared/ui/buttons/CancelButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select"

type TProps = {
  className?: string
}
export const CompanyFilterFiled = ({ className }: TProps) => {
  const { filterCompanies, activeFilters, updateFilter } = usePathFilters()

  return (
    <FormItem labelText="Компания" className={cn(className)}>
      <CancelButton
        onClick={() => updateFilter(1)('')}
        className="absolute right-0 top-0 z-10"
      />
      <Select
        value={activeFilters.company || ''}
        onValueChange={updateFilter(1)}

      >
        <SelectTrigger
          className={'bg-white text-left h-max'}
        >
          <SelectValue placeholder="Выберите компанию" />
        </SelectTrigger>
        <SelectContent>
          {filterCompanies.map((item) => (
            <SelectItem
              key={item.id}
              value={String(item.id)}
            >
              <span className="flex gap-3 items-center ">
                <span className="hyphens-auto">
                  {item.name}
                </span>
                <span className="text-gray-400">
                  {`(${item.count})`}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
}