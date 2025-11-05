import { getFilterCompanies } from "@/shared/api/actions";
import { getPubVacancyPositions } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/modals/FiltersSheet";
import { PathFiltersProvider, PositionsFilterToggle, PubVacanciesFilter, SearchVacancies } from "@/widgets/rekru-vacancy-filter";
import { RekruVacancyFilter } from "@/widgets/rekru-vacancy-filter/ui/RekruVacancyFilter";

export default async function JobSiteVacanciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const vacancyPositions = await getPubVacancyPositions()
  const filterCompanies = await getFilterCompanies()

  return (
    <PathFiltersProvider positionsList={vacancyPositions} filterCompanies={filterCompanies}>

      {/* content section */}
      <section className="pt-2 pb-10 md-lg:py-10">
        <div
          className={cn(
            'rekru-container flex flex-col justify-between  gap-8 ',
            'md:gap-10',
          )}
        >
          <PositionsFilterToggle className="hidden md:flex" />

          <div
            className="flex gap-2 md:gap-5 md:flex-col"
          >


            <SearchVacancies
              className="grow"
            />
            {/* desktop filters */}
            <RekruVacancyFilter className="hidden md:flex" />

            {/* mobile filters */}
            <FiltersSheet
              className="md:hidden"
            >
              <PubVacanciesFilter />
            </FiltersSheet>
          </div>
          {children}
        </div>
      </section>
    </PathFiltersProvider>
  )
}