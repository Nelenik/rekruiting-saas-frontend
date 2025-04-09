'use client'

import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select";
import { FC } from "react";
import { SelectProps } from "@radix-ui/react-select";
import { getVacancyPositions } from "@/shared/api/getData";
import { vacancyPositionsDict } from "../lib/dictionary";


type TProps = {
  className?: string
} & SelectProps

export const PositionSelect: FC<TProps> = ({ className, ...props }) => {
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