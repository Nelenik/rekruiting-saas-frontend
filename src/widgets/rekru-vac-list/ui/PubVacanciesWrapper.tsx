import { Paginate } from "@/features/pagination";
import { PubVacancyList } from "./PubVacancyList";
import { getPubVacanciesList } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { SortingVacancies } from "@/widgets/rekru-sort-vacancies";

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
      <div className="flex items-center flex-wrap justify-between gap-2 px-6">
        <p className="font-medium shrink-0 mr-6">
          Найдено вакансий: {total ?? 0}
        </p>
        <SortingVacancies className="shrink-0" />
      </div>
      <PubVacancyList
        publicVacanciesList={publicVacancies}

      />
      <Paginate currentPage={Number(filters.page) || 1} totalItems={total} itemsPerPage={itemsPerPage} />
    </div>
  );
}