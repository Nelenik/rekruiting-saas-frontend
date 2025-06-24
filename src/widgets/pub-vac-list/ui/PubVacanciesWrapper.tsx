import { Paginate } from "@/features/pagination";
import { PubVacancyList } from "./PubVacancyList";
import { getPubVacanciesList } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";

type TProps = {
  filters: Record<string, string>
  className?: string
}
export const PubVacanciesWrapper = async ({
  filters,
  className = ''
}: TProps) => {
  const { data: publicVacancies, total = null } = await getPubVacanciesList(filters)
  return (
    <div
      className={cn(
        className
      )}
    >
      <PubVacancyList
        publicVacanciesList={publicVacancies}

      />
      <Paginate currentPage={Number(filters.page) || 1} totalItems={total} className='mt-6' />
    </div>
  );
}