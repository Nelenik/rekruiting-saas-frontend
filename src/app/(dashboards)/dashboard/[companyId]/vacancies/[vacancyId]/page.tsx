import { FC } from 'react';

import { getVacancy } from '@/actions/getData';
import { SummaryCard } from '@/components/cards/SummaryCard';
import { TVacancy } from '@/shared/types';
import Link from 'next/link';
import EditEntityModal from '@/components/modals/EditEntityModal';
import MatchBoard from '@/components/dnd-boards/MatchBoard';
import { SingleVacancyProvider } from '@/providers/SingleVacancyProvider';


type TProps = {
  params: Promise<{ vacancyId: string, companyId: string }>
};

const VacancyMatchPage: FC<TProps> = async ({ params }) => {
  const { companyId, vacancyId } = await params;

  const vacancy = await getVacancy(vacancyId);

  return (
    <SingleVacancyProvider vacancy={vacancy}>

      <div className="flex gap-6 flex-col relative">
        <EditEntityModal<TVacancy>
          className='absolute top-0 right-0 z-10' triggerView='icon'
          initialData={vacancy}
          entityType='vacancy'
        />

        <Link
          scroll={false}
          href={`/dashboard/${companyId}/vacancy-info/${vacancyId}?name=${vacancy.name}`}
        >
          <SummaryCard />
        </Link>

        <MatchBoard />
      </div>
    </SingleVacancyProvider>
  );
};

export default VacancyMatchPage;
