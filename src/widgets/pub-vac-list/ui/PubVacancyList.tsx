import { publicVacancies } from "@/shared/api/mockData";
import { cn } from "@/shared/lib/utils";
import List from "@/shared/ui/shadcn/list";
import { PubVacancyCard } from "./PubVacancyCard";

type TProps = {
  className?: string
}
export const PubVacancyList = async ({
  className
}: TProps) => {
  const pubVacList = publicVacancies
  return (
    <List
      className={cn(
        'w-full flex flex-col gap-4',
        className
      )}
    >
      {pubVacList.map(vacEl => (
        <li key={vacEl.id}>
          <PubVacancyCard vacancy={vacEl} />
        </li>
      ))}
    </List>
  );
}