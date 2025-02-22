import { FC, Suspense } from 'react';

import { getBasicCandidatesByStatus } from '@/actions/getData';
import { EMatchStatus } from '@/shared/types';

import { CandidateCard } from './cards/CandidateCard';
import { FunnelCard } from './cards/FunnelCard';
import { matchStatusesDict } from '@/shared/dictionaries';

type TProps = {
  vacId: number;
  status: EMatchStatus;
  companyId: string
};

export const MatchStatusCol: FC<TProps> = async ({ companyId, vacId, status }) => {
  const candidates = await getBasicCandidatesByStatus(vacId, status);

  // const candidates = mockCandidateShort

  return (
    <>
      <FunnelCard name={matchStatusesDict[status]} count={candidates.length || 0} />

      <Suspense fallback={<p>Loading...</p>}>
        <ul className="[&>li:not(:last-child)]:mb-2">
          {candidates.map((candidate) => {
            return (
              <li key={candidate.id}>
                <CandidateCard
                  id={candidate.id}
                  name={candidate.name}
                  city={candidate.city}
                  salary={candidate.salary}
                  rating={candidate.match_point}
                />
              </li>
            );
          })}
        </ul>
      </Suspense>
    </>
  );
};
