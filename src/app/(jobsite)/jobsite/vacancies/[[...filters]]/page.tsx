import { vacancyPositionsDict } from "@/entities/vacancy";
import { isSegmentPosition } from "@/entities/vacancy";
import { getFilterCompanies } from "@/shared/api/actions";
import { decodeSegment } from "@/shared/lib/encodeSegments";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { buildQueryString } from "@/shared/lib/updateQueryString";
import { PubVacanciesWrapper } from "@/widgets/rekru-vac-list";
import { PubVacancyListSkeleton } from "@/widgets/rekru-vac-list/ui/Skeleton";
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

  const filterCompaniesList = await getFilterCompanies()

  const queryParams = (await searchParams)
  const pathParams = (await params).filters || []

  //if there more than 2 catch-all segments then redirect to the 404 page
  if (pathParams.length > 2) {
    notFound()
  }

  const [position = '', company = ''] = pathParams

  //if first params is not available position consider it as company and redirect to all/{compnay}
  if (pathParams.length === 1) {
    if (!isSegmentPosition(position) && position !== 'all') {
      redirect(`/vacancies/all/${position}?${buildQueryString(queryParams)}`)
    }
  }

  const normPosition = position === 'all' ? '' : position

  //find choosen company id to make request
  const companyData = filterCompaniesList.find((item) => decodeSegment(company).toLowerCase() === item.name.toLowerCase())
  const companyId = companyData ? String(companyData.id) : ''

  const filters = { ...queryParams, position: normPosition, company: companyId }

  return (
    <Suspense fallback={<PubVacancyListSkeleton />}>
      <PubVacanciesWrapper
        className="w-full"
        filters={filters}
      />
    </Suspense>
  );
}
