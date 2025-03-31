import MatchInfo from "@/components/pages/matchInfo/MatchInfo";

const MatchDetailsPage = async ({ params }: { params: Promise<{ matchId: string }> }) => {
  const { matchId } = await params;
  return (
    <div>
      <MatchInfo matchId={Number(matchId)} />
    </div>
  );
}

export default MatchDetailsPage;