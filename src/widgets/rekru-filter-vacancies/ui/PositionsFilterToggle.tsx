'use client'
import { usePathFilters } from "../model/PathFiltersProvider";
import { vacancyPositionsDict } from "@/entities/vacancy";
import { TVacancyPosition } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/shadcn/toggle-group";



type PositionItemProps = {
  positionValue: TVacancyPosition

}
const PositionToggleItem = ({ positionValue, ...props }: PositionItemProps) => {
  const { position, count } = positionValue
  const positionText = vacancyPositionsDict[position]

  if (!positionText) return null

  return (
    <ToggleGroupItem
      value={position}
      {...props}
      className={cn(
        'px-6 py-3.5 h-auto font-normal mr-2 tracking-tighter rounded-lg border-accent2/10 shadow-[0px_4px_4px_rgba(88,119,174,0.1)]',
        'data-[state=on]:bg-primary data-[state=on]:text-white',
        "hover:bg-accent2/10"
      )}
    >
      {positionText}
      <span>
        {`(${count})`}
      </span>
    </ToggleGroupItem>
  )
}

type TProps = {
  className?: string
}
export const PositionsFilterToggle = ({
  className
}: TProps) => {
  const { positionsList, activeFilters, updateFilter } = usePathFilters()

  return (
    <ToggleGroup
      type="single"
      variant={'outline'}
      value={activeFilters.position || ''}
      className={cn('flex flex-wrap gap-6 justify-start', className)}
      onValueChange={updateFilter(0)}
    >
      {positionsList.map((item) => (
        <PositionToggleItem
          key={item.position}
          positionValue={item}
        />
      ))}
    </ToggleGroup>
  );
}