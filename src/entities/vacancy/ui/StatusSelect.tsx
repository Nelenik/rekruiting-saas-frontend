import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select";
import { FC } from "react";
import { SelectProps } from "@radix-ui/react-select";
import { vacanciesDefaultStatuses } from "@/shared/constants/default-vacancy-statuses";

type TProps = {
  className?: string,
} & SelectProps
export const StatusSelect: FC<TProps> = ({ className, ...props }) => {
  return (
    <Select {...props}>
      <SelectTrigger
        className={className}
      >
        <SelectValue placeholder={"Статус вакансии"} />
      </SelectTrigger>
      <SelectContent>
        {vacanciesDefaultStatuses &&
          vacanciesDefaultStatuses.map((status) => (
            <SelectItem key={status.id} value={String(status.id)}>
              {status.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}