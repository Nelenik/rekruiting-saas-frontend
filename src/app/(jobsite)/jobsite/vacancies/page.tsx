import { cn } from "@/shared/lib/utils";
import { CvListSkeleton } from "@/shared/ui/skeletons/CvListSkeleton";
import { PubVacanciesFilter } from "@/widgets/filter-pub-vacancy";
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
      <Suspense fallback={<CvListSkeleton />}>
        <PubVacanciesWrapper
          className="max-w-[782px] grow"
          filters={filters}
        />
      </Suspense>
    </div>
  );
}
