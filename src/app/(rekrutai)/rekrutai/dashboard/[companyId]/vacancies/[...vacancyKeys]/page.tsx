import { FC, Suspense } from 'react';
import Link from 'next/link';
import { MatchBoard } from '@/widgets/match-board';
import { SingleVacancyProvider, VacancyMatchStatusesProvider, VacancySummaryCard } from '@/entities/vacancy';
import { EditEntity } from '@/features/mutate-entity';
import { TVacancy } from '@/shared/api/types';
import { VacancyPageSkeleton } from '@/shared/ui/skeletons/VacancyPageSkeleton';
import { AddMatchesForm } from '@/features/add-matches/ui/AddMatchesForm';
import { getVacancy } from '@/shared/api/actions';
import { redirect } from 'next/navigation';
import { encodeSegment } from '@/shared/lib/encodeSegments';


type TProps = {
  params: Promise<{ vacancyKeys: string[], companyId: string }>
};

const VacancyMatchPage: FC<TProps> = async ({ params }) => {
  const { companyId, vacancyKeys } = await params;
  if (vacancyKeys.length > 2) {
    redirect(`/dashboard/${companyId}/vacancies`);
  }

  const [vacancyId, vacancyName] = vacancyKeys;
  const vacancy = await getVacancy(vacancyId);

  if (!vacancy) return null;

  //if  vacancyName segment is not provided or it differs from vacancy.name, redirect to valid url with vacancy name got from API response
  const vacancySlug = encodeSegment(vacancy.name)
  if (!vacancyName || vacancyName !== vacancySlug) {
    redirect(`/dashboard/${companyId}/vacancies/${vacancyId}/${vacancySlug}`)
  }

  return (
    <Suspense fallback={<VacancyPageSkeleton />}>

      <SingleVacancyProvider vacancy={vacancy}>
        <VacancyMatchStatusesProvider>
          <div className="flex gap-6 flex-col relative">
            <EditEntity<TVacancy>
              className='absolute top-0 right-0 z-10' triggerView='icon'
              initialData={vacancy}
              entityType='vacancy'
            />

            <Link
              scroll={false}
              href={`/dashboard/${companyId}/vacancyDetails/${vacancyId}/${encodeSegment(vacancy.name)}`}
            >
              <VacancySummaryCard />
            </Link>
            <AddMatchesForm vacancyId={vacancyId} />
            <MatchBoard />
          </div>
        </VacancyMatchStatusesProvider>

      </SingleVacancyProvider>
    </Suspense>
  );
};

export default VacancyMatchPage;
