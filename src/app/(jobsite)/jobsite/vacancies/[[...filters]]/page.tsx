import { vacancyPositionsDict } from "@/entities/vacancy";
import { isSegmentPosition } from "@/entities/vacancy/lib/isSegmentPosition";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { cn } from "@/shared/lib/utils";
import { FiltersSheet } from "@/shared/ui/FiltersSheet";
import { CvListSkeleton } from "@/shared/ui/skeletons/CvListSkeleton";
import { PubVacanciesFilter } from "@/widgets/filter-pub-vacancy";
import { SearchVacancies } from "@/widgets/filter-pub-vacancy/ui/SearchVacancies";
import { PubVacanciesWrapper } from "@/widgets/pub-vac-list";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

type TProps = {
  searchParams: Promise<Record<string, string>>
  params: Promise<{ filters: string[] }>
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { filters = [] } = await params;
  const [position, company] = filters;

  const baseUrl = 'https://rekru.ru/vacancies';
  const metadata: Metadata = {};

  const positionName = vacancyPositionsDict[position] || position;
  const companyName = company ? capitalizeSentences(company) : '';

  const isAll = !filters.length || (filters.length === 1 && position === 'all');

  // --- 1. Все вакансии ---
  if (isAll) {
    metadata.title = "Все вакансии на Rekru.ru";
    metadata.description = "Найдите работу мечты среди актуальных вакансий";
    metadata.alternates = {
      canonical: baseUrl,
    };
    return metadata;
  }

  // --- 2. Все вакансии в компании (all/company) ---
  if (position === 'all' && company) {
    metadata.title = `Все вакансии в компании ${companyName}`;
    metadata.description = `Откройте актуальные вакансии компании ${companyName} на Rekru.ru`;
    metadata.alternates = {
      canonical: `${baseUrl}/all/${company}`,
    };
    return metadata;
  }

  // --- 3. Вакансии по позиции и компании ---
  if (position && company) {
    metadata.title = `${positionName} в ${companyName}`;
    metadata.description = `Вакансии ${positionName} в компании ${companyName}. Подробные условия работы.`;
    metadata.alternates = {
      canonical: `${baseUrl}/${position}/${company}`,
    };
    return metadata;
  }

  // --- 4. Только по позиции ---
  if (position && !company) {
    metadata.title = `Все вакансии по позиции ${positionName} на Rekru.ru`;
    metadata.description = `Найдите работу мечты среди актуальных вакансий по позиции ${positionName}`;
    metadata.alternates = {
      canonical: `${baseUrl}/${position}`,
    };
    return metadata;
  }

  return metadata;
}

export default async function JobsiteVacanciesPage({ searchParams, params }: TProps) {

  const getParams = (await searchParams)
  const pathParams = (await params).filters || []

  //if first params is not available position consider it as company and redirect to all/{compnay}
  if (pathParams.length === 1) {
    const firstPathParam = pathParams[0]
    if (!isSegmentPosition(firstPathParam) && firstPathParam !== 'all') {
      redirect(`/vacancies/all/${pathParams[0]}`)
    }
  }

  //if there more than 2 catch-all segments then redirect to the 404 page
  if (pathParams.length > 2) {
    notFound()
  }

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
          filters={getParams}
        />
      </Suspense>
    </div>
  );
}
