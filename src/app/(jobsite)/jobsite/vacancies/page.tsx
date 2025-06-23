import { Paginate } from "@/features/pagination";
import { getPubVacanciesList } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { PubVacanciesFilter } from "@/widgets/filter-pub-vacancy";
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
        'flex flex-col justify-between gap-6 ',
        'md:flex-row'
      )}
    >

      <aside
        className="relative"
      >

        <PubVacanciesFilter
          className="sticky top-0"
        />
      </aside>
      <div
        className="max-w-[782px] grow"
      >
        <PubVacancyList
          publicVacanciesList={publicVacancies}

        />
        <Paginate currentPage={Number(filters.page) || 1} totalItems={total} className='mt-6' />
      </div>
    </div>
  );
}
