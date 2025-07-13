'use client'
import { usePositions } from "../model/PositionsProvider";
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
        'px-4',
        'data-[state=on]:bg-primary data-[state=on]:text-white'
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
  const { positionsList, active: currentPosition, updatePosition } = usePositions()

  return (
    <ToggleGroup
      type="single"
      variant={'outline'}
      value={currentPosition}
      className={cn('flex-wrap justify-start gap-2', className)}
      onValueChange={updatePosition}
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