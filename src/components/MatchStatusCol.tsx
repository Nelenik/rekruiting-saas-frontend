import { getBasicCandidatesByStatus } from "@/actions/getData";
import { CandidateBasic, MatchStatus } from "@/types/matchTypes";
import Link from "next/link";
import CandidateCard from "./Cards/CandidateCard";
import FunnelCard from "./Cards/FunnelCard";

interface IMatchStatusColProps {
  vacId: number,
  status: MatchStatus
}

const MatchStatusCol = async ({ vacId, status }: IMatchStatusColProps) => {
  const candidates: CandidateBasic[] = await getBasicCandidatesByStatus(vacId, status)

  return (
    <>
      <FunnelCard name={status} count={candidates.length || 0} />
      <ul className="[&>li:not(:last-child)]:mb-2">
        {candidates.map((candidate: CandidateBasic) => {
          return (
            <li key={candidate.id}>
              <Link href={`/dashboard/resume/${candidate.CandyName}-${candidate.id}`}>
                <CandidateCard
                  name={`${candidate.CandyName}`}
                  city={`${candidate.CandyCity}`}
                  salary={candidate.CvSalary[0]}
                  rating={candidate.MatchPoint}
                />
              </Link>

            </li>
          )
        })}
      </ul>
    </>
  );
}

export default MatchStatusCol;