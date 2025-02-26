import { FC } from 'react';

import { getVacancy } from '@/actions/getData';
import { SummaryCard } from '@/components/cards/SummaryCard';
import { TVacancy } from '@/shared/types';
import Link from 'next/link';
import EditEntityModal from '@/components/modals/EditEntityModal';
import MatchBoard from '@/components/dnd-boards/MatchBoard';


type TProps = {
  params: Promise<{ vacancyId: string, companyId: string }>
};

const VacancyMatchPage: FC<TProps> = async ({ params }) => {
  const { companyId, vacancyId } = await params;

  const vacancy = await getVacancy(vacancyId);

  return (
    <div className="flex gap-6 flex-col relative">
      <EditEntityModal<TVacancy>
        className='absolute top-2 right-2 z-10' triggerView='icon'
        initialData={vacancy}
        entityType='vacancy'
      />

      <Link
        scroll={false}
        href={`/dashboard/${companyId}/vacancy-info/${vacancyId}?name=${vacancy.name}`}
      >
        <SummaryCard
          vacancyName={vacancy.name}
          createdAt={vacancy.created_at}
          salaryOfferFrom={vacancy.salary_from}
          salaryOfferTo={vacancy.salary_to}
          salaryMiddle={vacancy.salary_market}
          salaryCandidate={vacancy.salary_candy}
          candidatesCount={vacancy.match_count}
          jobReactions={vacancy.match_hot_count}
        />
      </Link>

      <MatchBoard />

      {/* <div className="flex gap-6 w-full overflow-auto pb-2 shadow-inner">
        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.SCREENING} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.SCORING} />
        </div>


        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.INTERVIEW} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.REFUSAL} />
        </div>

        <div className="flex gap-6 flex-col">
          <MatchStatusCol companyId={companyId} vacId={vacancy.id} status={EMatchStatus.OFFER} />
        </div>
      </div> */}
    </div>
  );
};

export default VacancyMatchPage;
