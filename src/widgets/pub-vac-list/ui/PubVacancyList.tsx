import { cn } from "@/shared/lib/utils";
import List from "@/shared/ui/shadcn/list";
import { PubVacancyCard } from "./PubVacancyCard";
import { TPublicVacancy } from "@/shared/api/types";

type TProps = {
  className?: string
  publicVacanciesList: TPublicVacancy[]
}
export const PubVacancyList = async ({
  className,
  publicVacanciesList
}: TProps) => {
  return (
    <List
      className={cn(
        'w-full flex flex-col gap-4',
        className
      )}
    >
      {publicVacanciesList.map(vacEl => (
        <li key={vacEl.id}>
          <PubVacancyCard vacancy={vacEl} />
        </li>
      ))}
    </List>
  );
}