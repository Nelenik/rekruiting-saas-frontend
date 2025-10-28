import { cn } from "@/shared/lib/utils";
import { HeroSwiper } from "./HeroSwiper";
import { SearchBar } from "@/features/search-bar/ui/SearchBar";
import { CompaniesSwiper } from "./CompaniesSwiper";
import { getFilterCompanies } from "@/shared/api/actions";

import { TrustSection } from "./TrustSection";
import { StepsSection } from "./StepsSection";
import { getPubVacanciesList } from "@/shared/api/actions/public-vacancy";
import { TopVacancies } from "./TopVacanices";



export const RekruHome = async () => {

  const companies = await getFilterCompanies()

  const topList = await getPubVacanciesList({ sort: '-publication_at' })

  return (
    <>
      <section
        className='min-h-[495px] overflow-hidden'
      >
        <HeroSwiper />
      </section >

      <section className="py-10">
        <div className="rekru-container">
          <SearchBar className="py-5 md:p-10" />
        </div>
      </section>

      <section className="mb-10">
        <div className="rekru-container">
          <h2 className={cn(
            'mb-10 text-3xl font-semibold tracking-tighter text-center',
            'lg:text-5xl'
          )}>
            Вакансии лучших компаний
          </h2>
          <CompaniesSwiper
            companiesList={companies}
          />
        </div>
      </section>

      <section className="my-10">
        <div className="rekru-container">
          <StepsSection />
        </div>
      </section>

      <section className="my-10">
        <div className="rekru-container">
          <TopVacancies
            topList={topList.data.slice(0, 10)}
          />
        </div>
      </section>

      <section className="my-10">
        <div className="rekru-container">
          <TrustSection />
        </div>
      </section>
    </>
  );
}