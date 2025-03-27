'use client'

import { getVacancyPositions } from "@/actions/getData";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { vacancyPositionsDict } from "@/shared/dictionaries";
import { FC } from "react";
import { SelectProps } from "@radix-ui/react-select";


type TProps = {
  className?: string
} & SelectProps

const PositionSelect: FC<TProps> = ({ className, ...props }) => {
  const { data: vacancyPositions } = useQuery({
    queryFn: getVacancyPositions,
    queryKey: ['vacancy', 'positions'],
  });

  return (
    <Select {...props}>
      <SelectTrigger
        className={className}
      >
        <SelectValue placeholder="Выберите позицию" />
      </SelectTrigger>
      <SelectContent>
        {vacancyPositions &&
          vacancyPositions.map((position) => (
            <SelectItem key={position} value={position}>
              {vacancyPositionsDict[position]}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

export default PositionSelect;