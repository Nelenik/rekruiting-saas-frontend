import { getFilterCompanies } from "@/shared/api/actions";
import { getPubVacancyPositions } from "@/shared/api/actions/public-vacancy";
import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/modals/FiltersSheet";
import { GoBackLink } from "@/shared/ui/navigation/GoBackLink";
import { MobileMenu } from "@/widgets/rekru-nav";
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
      <section className={cn(
        "py-4 bg-background sticky top-0 z-[5]",
        ' md-lg:hidden md-lg:invisible'
      )}>
        <div className="rekru-container flex items-center justify-between gap-20 ">
          <GoBackLink
            className='p-0'
            text='Назад'
          />
          <MobileMenu />
        </div>
      </section>
      <section className="pt-2 pb-8 md-lg:py-8">
        <div
          className={cn(
            'rekru-container flex flex-col justify-between  gap-8 ',
            'md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-x-6 md:gap-y-4',
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

          <PositionsFilterToggle className="hidden md:flex md:col-span-2 md:mb-8" />

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
      </section>
    </PathFiltersProvider>
  )
}