import { cn } from "@/shared/lib/utils";
import { ReserveFilter } from "@/widgets/filters/ui/ReserveFilter";
import { PubVacancyList } from "@/widgets/pub-vac-list";

export default async function JobsiteVacanciesPage() {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-6',
        'md:flex-row'
      )}
    >

      <ReserveFilter />
      <PubVacancyList
        className="max-w-[782px]"
      />
    </div>
  );
}
