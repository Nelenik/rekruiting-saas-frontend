import { FC, Suspense } from 'react';
import Link from 'next/link';

import { getBasicCandidatesByStatus } from '@/actions/getData';
import { EMatchStatus } from '@/shared/types';

import { CandidateCard } from './cards/CandidateCard';
import { FunnelCard } from './cards/FunnelCard';
import { mockCandidateShort } from '@/actions/mockData';
import { matchStatusesDict } from '@/shared/dictionaries';

type TProps = {
  vacId: number;
  status: EMatchStatus;
  companyId: string
};

export const MatchStatusCol: FC<TProps> = async ({ companyId, vacId, status }) => {
  // const candidates = await getBasicCandidatesByStatus(vacId, status);

  const candidates = mockCandidateShort

  return (
    <>
      <FunnelCard name={matchStatusesDict[status]} count={candidates.length || 0} />

      <Suspense fallback={<p>Loading...</p>}>
        <ul className="[&>li:not(:last-child)]:mb-2">
          {candidates.map((candidate) => {
            return (
              <li key={candidate.id}>
                <Link
                  href={`/dashboard/${companyId}/candidate-info/${candidate.id}?name=${candidate.name}`}
                >
                  <CandidateCard
                    name={candidate.name}
                    city={candidate.city}
                    salary={candidate.salary}
                    rating={candidate.match_point}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Suspense>
    </>
  );
};
