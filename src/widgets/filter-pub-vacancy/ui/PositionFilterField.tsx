import { vacancyPositionsDict } from "@/entities/vacancy";
import { cn } from "@/shared/lib/utils";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import FormItem from "@/shared/ui/FormItem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select";
import { usePositions } from "../model/PositionsProvider";

type TProps = {
  className?: string
}

export const PositionFilterField = ({ className }: TProps) => {
  const { positionsList, active: currentPosition, updatePosition } = usePositions()

  return (
    <FormItem labelText="Специализация" className={cn(className)}>
      <CancelButton
        onClick={() => updatePosition('')}
        className="absolute right-0 top-0 z-10"
      />
      <Select
        value={currentPosition}
        onValueChange={updatePosition}

      >
        <SelectTrigger
          className={'bg-white'}
        >
          <SelectValue placeholder="Выберите позицию" />
        </SelectTrigger>
        <SelectContent>
          {positionsList.map((position) => (
            <SelectItem key={position} value={position}>
              {vacancyPositionsDict[position]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
}