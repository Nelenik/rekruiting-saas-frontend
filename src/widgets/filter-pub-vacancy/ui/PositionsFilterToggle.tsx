'use client'
import { usePositions } from "../model/PositionsProvider";
import { vacancyPositionsDict } from "@/entities/vacancy";
import { cn } from "@/shared/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/shadcn/toggle-group";



type PositionItemProps = {
  positionValue: string

}
const PositionToggleItem = ({ positionValue, ...props }: PositionItemProps) => {
  const positionText = vacancyPositionsDict[positionValue]

  if (!positionText) return null

  return (
    <ToggleGroupItem
      value={positionValue}
      {...props}
      className='data-[state=on]:bg-primary data-[state=on]:text-white'
    >
      {positionText}
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
      className={cn('flex-wrap', className)}
      onValueChange={updatePosition}
    >
      {positionsList.map((position) => (
        <PositionToggleItem
          key={position}
          positionValue={position}
        />
      ))}
    </ToggleGroup>
  );
}