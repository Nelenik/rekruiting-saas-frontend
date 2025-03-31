import InterceptingModal from '@/components/modals/InterceptingModal';
import MatchInfo from '@/components/pages/matchInfo/MatchInfo';

const MatchDetailsModal = async ({ params }: { params: Promise<{ matchId: string }> }) => {
  const { matchId } = await params;
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <MatchInfo matchId={Number(matchId)} />
    </InterceptingModal>
  );
};

export default MatchDetailsModal;
