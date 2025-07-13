import { Paginate } from "@/features/pagination";
import { PubVacancyList } from "./PubVacancyList";
import { getPubVacanciesList } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { SortingVacancies } from "@/widgets/filter-pub-vacancy";

type TProps = {
  filters: Record<string, string>
  className?: string
}
export const PubVacanciesWrapper = async ({
  filters,
  className = ''
}: TProps) => {
  const { data: publicVacancies, total = null, itemsPerPage } = await getPubVacanciesList(filters)

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <SortingVacancies />
        <p className="font-bold">
          Найдено вакансий: {total ?? 0}
        </p>
      </div>
      <PubVacancyList
        publicVacanciesList={publicVacancies}

      />
      <Paginate currentPage={Number(filters.page) || 1} totalItems={total} itemsPerPage={itemsPerPage} />
    </div>
  );
}