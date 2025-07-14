import { MatchDetails } from "@/pages-layer/match-details";
import { getCandidateFull } from "@/shared/api/actions";
import { encodeSegment } from "@/shared/lib/encodeSegments";
import { GoBackLink } from "@/shared/ui/GoBackLink";
import { redirect } from "next/navigation";

const MatchDetailsPage = async ({ params }: { params: Promise<{ matchKeys: string[], companyId: string }> }) => {
  const { matchKeys, companyId } = await params;
  const [matchId, matchName] = matchKeys

  const candidate = await getCandidateFull(Number(matchId))
  if (!candidate) return null;

  const candidateSlug = encodeSegment(candidate.cv.name)
  if (!matchName || matchName !== candidateSlug) {
    redirect(`/dashboard/${companyId}/matchDetails/${matchId}/${candidateSlug}`)
  }

  return (
    <div>
      <GoBackLink
        text="Назад к мэтчам"
      />
      <MatchDetails candidate={candidate} />
    </div>
  );
}

export default MatchDetailsPage;

