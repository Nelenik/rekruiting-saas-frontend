import MatchInfo from "@/components/pages/matchInfo/MatchInfo";

const CandidateDetailsPage = async ({ params }: { params: Promise<{ candidateId: string }> }) => {
  const { candidateId } = await params;
  return (
    <div>
      <MatchInfo matchId={Number(candidateId)} />
    </div>
  );
}

export default CandidateDetailsPage;