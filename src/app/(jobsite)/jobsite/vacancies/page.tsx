import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/FiltersSheet";
import { CvListSkeleton } from "@/shared/ui/skeletons/CvListSkeleton";
import { PubVacanciesFilter } from "@/widgets/filter-pub-vacancy";
import { SearchVacancies } from "@/widgets/filter-pub-vacancy/ui/SearchVacancies";
import { PubVacanciesWrapper } from "@/widgets/pub-vac-list";
import { Suspense } from "react";

type TProps = {
  searchParams: Promise<Record<string, string>>
}
export default async function JobsiteVacanciesPage({ searchParams }: TProps) {

  const filters = (await searchParams)
  return (
    <div
      className={cn(
        'flex flex-col justify-between  gap-12',
        'md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-x-6 md:gap-y-16',
        // 'md:flex-row'
      )}
    >
      <div
        className="flex gap-4  md:col-span-2"
      >

        <SearchVacancies
          className="grow"
        />


        <FiltersSheet
          className="md:hidden"
        >
          <PubVacanciesFilter />
        </FiltersSheet>
      </div>
      <aside
        className={cn(
          "hidden md:block",
          "relative")}
      >

        <PubVacanciesFilter
          className="sticky top-0"
        />
      </aside>
      <Suspense fallback={<CvListSkeleton />}>
        <PubVacanciesWrapper
          className="w-full max-w-[782px] grow justify-self-end"
          filters={filters}
        />
      </Suspense>
    </div>
  );
}
