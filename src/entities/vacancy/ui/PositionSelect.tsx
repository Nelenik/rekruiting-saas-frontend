'use client'

import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select";
import { FC } from "react";
import { SelectProps } from "@radix-ui/react-select";
import { vacancyPositionsDict } from "../lib/dictionary";
import { getVacancyPositions } from "@/shared/api/actions";


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
          vacancyPositions.map((item) => (
            <SelectItem key={item.position} value={item.position}>
              {vacancyPositionsDict[item.position]}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}