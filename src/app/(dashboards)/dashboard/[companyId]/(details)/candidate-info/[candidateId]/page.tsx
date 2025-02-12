import MatchInfo from "@/components/pages/MatchInfo";
import Resume from "@/components/pages/Resume";


const CandidatePage = async ({ params }: { params: Promise<{ candidateId: string }> }) => {
  const { candidateId } = await params;
  console.log('candidate id', candidateId);
  return (
    <div>
      <MatchInfo matchId={Number(candidateId)} />
    </div>
  );
}

export default CandidatePage;