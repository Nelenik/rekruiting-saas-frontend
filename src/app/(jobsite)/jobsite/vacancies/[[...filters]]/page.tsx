import { vacancyPositionsDict } from "@/entities/vacancy";
import { identifyPubVacancyFilters } from "@/entities/vacancy/model/identifyPubVacancyFilters";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/FiltersSheet";
import { CvListSkeleton } from "@/shared/ui/skeletons/CvListSkeleton";
import { PubVacanciesFilter } from "@/widgets/filter-pub-vacancy";
import { SearchVacancies } from "@/widgets/filter-pub-vacancy/ui/SearchVacancies";
import { PubVacanciesWrapper } from "@/widgets/pub-vac-list";
import { Suspense } from "react";

type TProps = {
  searchParams: Promise<Record<string, string>>
  params: Promise<{ filters: string[] }>
}

export async function generateMetadata({ params }: TProps) {
  const { filters } = await params;
  if (!filters || !filters.length) {
    return {
      title: "Все вакансии на Rekru.ru",
      description: "Найдите работу мечты среди актуальных вакансий"
    }
  }
  const { company, position } = identifyPubVacancyFilters(filters);

  if (filters.length === 1) {
    if (position) {
      const positionName = vacancyPositionsDict[position] || position
      return {
        title: `Вакансии по позиции ${positionName} на Rekru.ru`,
        description: `Найдите работу мечты среди актуальных вакансий по позиции ${positionName}`
      }
    } else if (company) {
      return {
        title: `Работа в ${company}`,
        description: `Открытые вакансии в компании ${capitalizeSentences(company)}. Посмотрите доступные позиции.`
      };
    }
  }
  if (filters.length === 2 && position && company) {
    const positionName = vacancyPositionsDict[position] || position
    return {
      title: `${positionName} в ${company}`,
      description: `Вакансии ${positionName} в компании ${capitalizeSentences(company)}. Подробные условия работы.`,
    }
  }
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
