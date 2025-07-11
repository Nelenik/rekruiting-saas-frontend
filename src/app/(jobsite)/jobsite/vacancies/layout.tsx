import { getVacancyPositions } from "@/shared/api/actions";
import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/FiltersSheet";
import { PositionsProvider, SearchVacancies, PubVacanciesFilter } from "@/widgets/filter-pub-vacancy";
import { PositionsFilterToggle } from "@/widgets/filter-pub-vacancy/ui/PositionsFilterToggle";

export default async function JobSiteVacanciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vacancyPositions = await getVacancyPositions()
  return (
    <PositionsProvider positionsList={vacancyPositions}>
      <div
        className={cn(
          'flex flex-col justify-between  gap-12',
          'md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-x-6 md:gap-y-8',
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

        <PositionsFilterToggle className="hidden md:flex md:col-span-2" />

        <aside
          className={cn(
            "hidden md:block",
            "relative")}
        >

          <PubVacanciesFilter
            className="sticky top-0"
          />
        </aside>
        {children}
      </div>
    </PositionsProvider>
  )
}