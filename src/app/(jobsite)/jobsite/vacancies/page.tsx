import { Paginate } from "@/features/pagination";
import { getPubVacanciesList } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { ReserveFilter } from "@/widgets/filters/ui/ReserveFilter";
import { PubVacancyList } from "@/widgets/pub-vac-list";

type TProps = {
  searchParams: Promise<{ [key: string]: string }>
}
export default async function JobsiteVacanciesPage({ searchParams }: TProps) {

  const filters = (await searchParams)
  const { data: publicVacancies, total = null } = await getPubVacanciesList(filters)

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-6 relative',
        'md:flex-row'
      )}
    >

      <ReserveFilter
        className="sticky top-0 self-start"
      />
      <div>

        <PubVacancyList
          publicVacanciesList={publicVacancies}
          className="max-w-[782px]"
        />
        <Paginate currentPage={Number(filters.page) || 1} totalItems={total} className='mt-6' />
      </div>
    </div>
  );
}
