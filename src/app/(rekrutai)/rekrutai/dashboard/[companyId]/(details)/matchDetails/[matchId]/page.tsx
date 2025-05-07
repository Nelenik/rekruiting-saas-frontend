import { MatchDetails } from "@/pages-layer/match-details";

const MatchDetailsPage = async ({ params }: { params: Promise<{ matchId: string }> }) => {
  const { matchId } = await params;
  return (
    <div>
      <MatchDetails matchId={Number(matchId)} />
    </div>
  );
}

export default MatchDetailsPage;