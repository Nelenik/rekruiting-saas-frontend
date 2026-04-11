import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/modals/FiltersSheet";
import { SearchVacancies } from "@/widgets/rekru-search-vacancies";
import { PathFiltersProvider, PositionsFilterToggle, RekruVacancyFilter, RekruVacancyMobFilter } from "@/widgets/rekru-filter-vacancies";
import { resolveRekruVacanciesCtx } from "@/entities/vacancy/lib/resolveRekruVacanciesCtx";
import { getPublicCompany } from "@/shared/api/actions";
import { CompanyInfoCard } from "@/entities/company/ui/CompanyInfoCard";
import { TCompany } from "@/shared/api/types";

export default async function JobSiteVacanciesLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ filters?: string[] }>
}>) {

  const pathParams = (await params).filters || []
  const { positionsList, companiesList, companyId } = await resolveRekruVacanciesCtx(pathParams)

  const companyById = companyId ? await getPublicCompany(companyId) : null

  return (
    <div className="pt-2 pb-10 md-lg:py-10 flex flex-col gap-8 md:gap-10">
      <PathFiltersProvider positionsList={positionsList} companiesList={companiesList}>
        {/* company card section */}

        {companyId && (
          <section>
            <div className="rekru-container">
              <CompanyInfoCard
                company={companyById || {} as TCompany}
              />
            </div>
          </section>
        )}

        {/* filter section */}
        <section>
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
                <RekruVacancyMobFilter />
              </FiltersSheet>
            </div>
          </div>
        </section>
        <section>
          <div className="rekru-container flex flex-col gap-6">
            {/* vacancies list */}
            {children}
          </div>
        </section>
      </PathFiltersProvider>
    </div>
  )
}