'use client'
import { vacancyPositionsDict } from "@/entities/vacancy";
import { cn } from "@/shared/lib/utils";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import FormItem from "@/shared/ui/FormItem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select";
import { usePathFilters } from "../model/PathFiltersProvider";

type TProps = {
  className?: string
}

export const PositionFilterField = ({ className }: TProps) => {
  const { positionsList, activeFilters, updateFilter } = usePathFilters()

  return (
    <FormItem labelText="Специализация" className={cn(className)}>
      <CancelButton
        onClick={() => updateFilter(0)('')}
        className="absolute right-0 top-0 z-10"
      />
      <Select
        value={activeFilters.position || ''}
        onValueChange={updateFilter(0)}

      >
        <SelectTrigger
          className={'bg-white text-left h-max'}
        >
          <SelectValue placeholder="Выберите позицию" />
        </SelectTrigger>
        <SelectContent>
          {positionsList.map((item) => (
            <SelectItem
              key={item.position}
              value={item.position}
            >
              <span className="flex gap-3 items-center ">
                <span className="hyphens-auto">
                  {vacancyPositionsDict[item.position]}
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