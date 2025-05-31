import { FC, Suspense } from 'react';
import Link from 'next/link';
import { MatchBoard } from '@/widgets/match-board';
import { SingleVacancyProvider, VacancyMatchStatusesProvider, VacancySummaryCard } from '@/entities/vacancy';
import { EditEntity } from '@/features/mutate-entity';
import { TVacancy } from '@/shared/api/types';
import { VacancyPageSkeleton } from '@/shared/ui/skeletons/VacancyPageSkeleton';
import { AddMatchesForm } from '@/features/add-matches/ui/AddMatchesForm';
import { getVacancy } from '@/shared/api/actions';


type TProps = {
  params: Promise<{ vacancyId: string, companyId: string }>
};

const VacancyMatchPage: FC<TProps> = async ({ params }) => {
  const { companyId, vacancyId } = await params;

  const vacancy = await getVacancy(vacancyId);

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
              href={`/dashboard/${companyId}/vacancyDetails/${vacancyId}?name=${vacancy.name}`}
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
