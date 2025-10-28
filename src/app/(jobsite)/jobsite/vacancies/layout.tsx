import { getFilterCompanies } from "@/shared/api/actions";
import { getPubVacancyPositions } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/modals/FiltersSheet";
import { PathFiltersProvider, PositionsFilterToggle, PubVacanciesFilter, SearchVacancies } from "@/widgets/rekru-vacancy-filter";

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
            'md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-x-6 md:gap-y-4',
          )}
        >
          <PositionsFilterToggle className="hidden md:flex md:col-span-2 md:mb-8" />

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



          {/* <aside
            className={cn(
              "hidden md:block",
              "relative")}
          >

            <PubVacanciesFilter
              className="sticky top-0"
            />
          </aside> */}
          {children}
        </div>
      </section>
    </PathFiltersProvider>
  )
}