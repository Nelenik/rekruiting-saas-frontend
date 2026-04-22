import { vacancyPositionsDict, normalizeVacanciesFilterPath } from "@/entities/vacancy";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { PubVacanciesWrapper, PubVacancyListSkeleton } from "@/pages-layer/rekru-vac-list";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { resolveRekruVacanciesCtx } from "@/entities/vacancy/lib/resolveRekruVacanciesCtx";
import { JOBSITE_DOMAIN } from "@/shared/api/constants";

type TProps = {
  searchParams: Promise<Record<string, string>>
  params: Promise<{ filters: string[] }>
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { filters = [] } = await params;
  const { position, company } = normalizeVacanciesFilterPath(filters)

  const baseUrl = `https://${JOBSITE_DOMAIN}/vacancies`;
  const metadata: Metadata = {};

  const positionName = vacancyPositionsDict[position] || position;
  const companyName = company ? capitalizeSentences(company) : '';

  // --- 1. All vacancies ---
  if (!filters.length) {
    metadata.title = "All vacancies on Rekru.ru";
    metadata.description = "Find your dream job among current vacancies";
    metadata.alternates = {
      canonical: baseUrl,
    };
    return metadata;
  }

  // --- 2. All vacancies at a company (vacancies/company) ---
  if (!position && company) {
    metadata.title = `All vacancies at ${companyName}`;
    metadata.description = `View current vacancies at ${companyName} on Rekru.ru`;
    metadata.alternates = {
      canonical: `${baseUrl}/${company}`,
    };
    return metadata;
  }

  // --- 3. Vacancies by position and company ---
  if (position && company) {
    metadata.title = `${positionName} at ${companyName}`;
    metadata.description = `${positionName} vacancies at ${companyName}. Detailed work conditions.`;
    metadata.alternates = {
      canonical: `${baseUrl}/${position}/${company}`,
    };
    return metadata;
  }

  // --- 4. By position only ---
  if (position && !company) {
    metadata.title = `All ${positionName} vacancies on Rekru.ru`;
    metadata.description = `Find your dream job among current ${positionName} vacancies`;
    metadata.alternates = {
      canonical: `${baseUrl}/${position}`,
    };
    return metadata;
  }

  return metadata;
}

export default async function JobsiteVacanciesPage({ searchParams, params }: TProps) {
  const queryParams = (await searchParams)
  const pathParams = (await params).filters || []
  //if there more than 2 catch-all segments then redirect to the 404 page
  if (pathParams.length > 2) {
    notFound()
  }
  const { position, companyId } = await resolveRekruVacanciesCtx(pathParams)

  const filters = { ...queryParams, position, company: companyId }

  return (
    <Suspense fallback={<PubVacancyListSkeleton />}>
      <PubVacanciesWrapper
        filters={filters}
      />
    </Suspense>
  );
}
