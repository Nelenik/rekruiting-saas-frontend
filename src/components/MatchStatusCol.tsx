import { FC, Suspense } from 'react';
import Link from 'next/link';

import { getBasicCandidatesByStatus } from '@/actions/getData';
import { EMatchStatus } from '@/shared/types';

import { CandidateCard } from './Cards/CandidateCard';
import { FunnelCard } from './Cards/FunnelCard';

type TProps = {
  vacId: number;
  status: EMatchStatus;
};

export const MatchStatusCol: FC<TProps> = async ({ vacId, status }) => {
  const candidates = await getBasicCandidatesByStatus(vacId, status);

  return (
    <>
      <FunnelCard name={status} count={candidates.length || 0} />

      <Suspense fallback={<p>Loading...</p>}>
        <ul className="[&>li:not(:last-child)]:mb-2">
          {candidates.map((candidate) => {
            return (
              <li key={candidate.id}>
                <Link
                  href={`/dashboard/resume/${candidate.name}-${candidate.id}`}
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
